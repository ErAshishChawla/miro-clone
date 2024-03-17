"use client";

import React, { useCallback, useMemo } from "react";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import ColorHash from "color-hash";

import { CursorsPresence } from "./cursors-presence";
import LayerPreview from "./layer-preview";
import SelectionBox from "./selection-box";

import {
  useHistory,
  useMutation,
  useOthersMapped,
  useStorage,
} from "../../../../../liveblocks.config";

import { pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { useCanvasStore } from "@/store/useCanvasStore";
import {
  CanvasMode,
  Layer,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";

const MAX_LAYERS = 100;

function CursorSvg() {
  const {
    cameraState,
    setCameraState,
    lastUsedColor,
    setCanvasState,
    canvasState,
  } = useCanvasStore();

  const history = useHistory();

  const layerIds = useStorage((root) => {
    return root.layerIds;
  });

  const colorHash = new ColorHash();

  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, cameraState);

      if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      setMyPresence({
        cursor: current,
      });
    },
    [cameraState, canvasState, resizeSelectedLayer]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({ mode: CanvasMode.Resizing, corner, initialBounds });
    },
    [history]
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      const newCamera = {
        x: cameraState.x - e.deltaX,
        y: cameraState.y - e.deltaY,
      };

      setCameraState(newCamera);
    },
    [cameraState]
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const insertLayer = useMutation(
    (
      { setMyPresence, storage },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, cameraState);
      console.log(point, canvasState.mode);

      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [cameraState, canvasState, insertLayer, history]
  );

  const selections = useOthersMapped((otherUsers) => {
    return otherUsers.presence.selection;
  });

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = colorHash.hex(
          connectionId.toString()
        );
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const onLayerPointerDown = useMutation(
    ({ setMyPresence, self }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, cameraState);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, cameraState, history, canvasState.mode]
  );

  return (
    <svg
      className="h-screen w-screen"
      onWheel={onWheel}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onPointerUp={onPointerUp}
    >
      <g
        style={{
          transform: `translate(${cameraState.x}px, ${cameraState.y}px)`,
        }}
      >
        {layerIds.map((layerId) => {
          return (
            <LayerPreview
              key={layerId}
              layerId={layerId}
              onLayerPointerDown={onLayerPointerDown} // Todo: Implement
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          );
        })}
        <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
        <CursorsPresence />
      </g>
    </svg>
  );
}

export default CursorSvg;

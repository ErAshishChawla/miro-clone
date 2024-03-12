"use client";

import React, { useCallback } from "react";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";

import { CursorsPresence } from "./cursors-presence";
import LayerPreview from "./layer-preview";

import {
  useHistory,
  useMutation,
  useStorage,
} from "../../../../../liveblocks.config";

import { pointerEventToCanvasPoint } from "@/lib/utils";
import { useCanvasStore } from "@/store/useCanvasStore";
import { CanvasMode, Layer, LayerType, Point } from "@/types/canvas";

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

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, cameraState);

      setMyPresence({
        cursor: current,
      });
    },
    []
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
              onLayerPointerDown={() => {}} // Todo: Implement
              selectionColor={"#000"}
            />
          );
        })}
        <CursorsPresence />
      </g>
    </svg>
  );
}

export default CursorSvg;

"use client";

import React, { memo } from "react";
import { useStorage } from "../../../../../liveblocks.config";
import { LayerType } from "@/types/canvas";

import Rectangle from "./rectangle";
import Ellipse from "./ellipse";
import Text from "./text";
import Note from "./note";

interface LayerPreviewProps {
  layerId: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

const LayerPreview = memo(function LayerPreview({
  layerId,
  onLayerPointerDown,
  selectionColor,
}: LayerPreviewProps) {
  const layer = useStorage((root) => root.layers.get(layerId));

  let content: React.ReactNode = null;

  if (!layer) {
    content = null;
  } else {
    switch (layer.type) {
      case LayerType.Rectangle:
        content = (
          <Rectangle
            layer={layer}
            layerId={layerId}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
        break;
      case LayerType.Ellipse:
        content = (
          <Ellipse
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
        break;
      case LayerType.Text:
        content = (
          <Text
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
        break;
      case LayerType.Note:
        content = (
          <Note
            id={layerId}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
        break;
      default:
        console.warn("Unknown layer type", layer.type);
        content = null;
        break;
    }
  }

  return content;
});

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;

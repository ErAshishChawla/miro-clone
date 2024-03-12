"use client";

import React, { memo } from "react";
import { useStorage } from "../../../../../liveblocks.config";
import { LayerType } from "@/types/canvas";
import Rectangle from "./rectangle";

interface LayerPreviewProps {
  layerId: string;
  onLayerPointerDown: () => void;
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

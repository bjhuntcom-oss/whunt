/**
 * ============================================================
 * © 2025 Whunt — WhatsApp Marketing Platform
 * Original Author: BTPL Engineering Team
 * Website: https://whunt.io
 * Contact: support@whunt.io
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { BaseEdge, getBezierPath, EdgeLabelRenderer } from "@xyflow/react";
import { X } from "lucide-react";
import { CustomEdgeProps } from "./types";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style,
  markerEnd,
  setEdges,
}: CustomEdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleDelete = () => {
    setEdges((eds) => eds.filter((e) => e.id !== id));
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: "#94a3b8",
          strokeWidth: 2,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="opacity-0 hover:opacity-100 transition-opacity duration-150"
        >
          <button
            onClick={handleDelete}
            className="w-5 h-5 bg-[#0a0a0a] border border-[#252525] rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors"
          >
            <X className="w-2.5 h-2.5 text-[#555] hover:text-red-500" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

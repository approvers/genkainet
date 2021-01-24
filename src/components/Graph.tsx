import cytospace, { NodeDefinition, EdgeDefinition, Core, Stylesheet } from "cytoscape";
import { IConnection, INode } from "@approvers/libgenkainet";
import React, { FC, useRef, useEffect } from "react";

import styles from "./Graph.module.scss";

const style: Stylesheet[] = [
  {
    selector: "node",
    style: {
      "background-color": "#06d8d7",
      color: "#fff",
      label: "data(id)",
    },
  },
  {
    selector: "edge",
    style: {
      width: 4,
      "line-color": "#286060",
      "target-arrow-color": "#286060",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
    },
  },
];

type Props = {
  nodes: string[];
  connections: IConnection[];
  onNodeClick?: (nodeId: string) => void;
  onBackgroundClick?: () => void;
};

const Graph: FC<Props> = React.memo(({ nodes, connections, onNodeClick, onBackgroundClick }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const graphNodes: NodeDefinition[] = nodes.map((id) => ({
      data: { id },
    }));
    const graphEdges: EdgeDefinition[] = connections.map(({ from, to }) => ({
      data: {
        source: from.id,
        target: to.id,
      },
    }));
    const elements: (NodeDefinition | EdgeDefinition)[] = [];
    elements.push(...graphNodes);
    elements.push(...graphEdges);
    const cy = cytospace({
      container: ref.current,
      elements,
      style,
      layout: { name: "random" },
    });
    cy.on("tap", (event) => {
      if (event.target === cy) {
        if (onBackgroundClick) onBackgroundClick();
      } else {
        const nodeId = event.target._private.data.id;
        if (onNodeClick) onNodeClick(nodeId);
      }
    });
  }, [nodes, connections]);
  return <div className={styles.graph} ref={ref} />;
});

export default Graph;

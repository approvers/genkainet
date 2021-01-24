import cytospace, { NodeDefinition, EdgeDefinition, Core, Stylesheet } from "cytoscape";
import { IConnection, INode } from "@approvers/libgenkainet";
import React, { FC } from "react";

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
};

const Graph: FC<Props> = ({ nodes, connections, onNodeClick }) => {
  const onLoad = (element: HTMLDivElement | null) => {
    if (!element) return;
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
      container: element,
      elements,
      style,
      layout: { name: "random" },
    });
    cy.on("tap", "node", (event) => {
      const nodeId = event.target._private.data.id;
      if (onNodeClick) onNodeClick(nodeId);
    });
  };
  return <div className={styles.graph} ref={onLoad} />;
};

export default Graph;

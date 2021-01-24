import cytospace, { NodeDefinition, EdgeDefinition, Core, Stylesheet } from "cytoscape";
import { IConnection, INode } from "@approvers/libgenkainet";
import React, { FC, useState } from "react";

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
  {
    selector: ".highlighted",
    style: {
      "background-color": "#ff6c77",
    },
  },
];

type Props = {
  nodes: INode[];
  connections: IConnection[];
  onNodeClick?: (nodeId: string) => void;
  onBackgroundClick?: () => void;
};

const Graph: FC<Props> = ({ nodes, connections, onNodeClick, onBackgroundClick }) => {
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  const onLoad = (element: HTMLDivElement | null) => {
    if (!element) return;
    const graphNodes: NodeDefinition[] = nodes.map(({ id }) => ({
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
    if (lastClicked) {
      cy.nodes("#" + lastClicked).addClass("highlighted");
    }
    cy.on("tap", (event) => {
      if (event.target === cy) {
        if (onBackgroundClick) onBackgroundClick();
        setLastClicked(null);
      } else {
        const nodeId = event.target._private.data.id;
        if (onNodeClick) onNodeClick(nodeId);
        setLastClicked(nodeId);
      }
    });
  };
  return <div className={styles.graph} ref={onLoad} />;
};

export default Graph;

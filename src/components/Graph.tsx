import cytospace, { NodeDefinition, EdgeDefinition } from "cytoscape";
import { IConnection, INode } from "@approvers/libgenkainet";
import React, { FC } from "react";

import styles from "./Graph.module.scss";

type Props = {
  nodes: INode[];
  connections: IConnection[];
};

const Graph: FC<Props> = ({ nodes, connections }) => {
  const graphNodes: NodeDefinition[] = nodes.map(({ id }) => ({
    data: { id },
  }));
  const graphEdges: EdgeDefinition[] = connections.map(({ from, to }) => ({
    data: {
      source: from.id,
      target: to.id,
    },
  }));
  const onLoad = (element: HTMLDivElement | null) => {
    if (!element) return;
    const elements: (NodeDefinition | EdgeDefinition)[] = [];
    elements.push(...graphNodes);
    elements.push(...graphEdges);
    cytospace({
      container: element,
      elements,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "#ccc",
            label: "data(id)",
          },
        },
        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
      layout: {
        name: "random",
      },
    });
  };
  return <div className={styles.graph} ref={onLoad} />;
};

export default Graph;

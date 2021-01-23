import cytospace, { NodeDefinition, EdgeDefinition, Core, Stylesheet } from "cytoscape";
import { IConnection, INode } from "@approvers/libgenkainet";
import React, { FC, useState } from "react";

import styles from "./Graph.module.scss";

const style: Stylesheet[] = [
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
];

type Props = {
  nodes: INode[];
  connections: IConnection[];
};

const Graph: FC<Props> = ({ nodes, connections }) => {
  const [cy, setCy] = useState<Core | null>(null);
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
    setCy(cy);
  };
  return <div className={styles.graph} ref={onLoad} />;
};

export default Graph;

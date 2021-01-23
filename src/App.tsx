import React, { FC } from "react";
import { INode, IConnection } from "@approvers/libgenkainet";
import Graph from "./components/Graph";

// for test
const nodes: INode[] = [
  { id: "0" },
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
];
const connections: IConnection[] = [
  { from: nodes[0], to: nodes[1], state: "established", establishedAt: new Date() },
  { from: nodes[0], to: nodes[2], state: "established", establishedAt: new Date() },
  { from: nodes[1], to: nodes[2], state: "established", establishedAt: new Date() },
  { from: nodes[1], to: nodes[4], state: "established", establishedAt: new Date() },
  { from: nodes[2], to: nodes[3], state: "established", establishedAt: new Date() },
  { from: nodes[3], to: nodes[5], state: "established", establishedAt: new Date() },
  { from: nodes[4], to: nodes[5], state: "established", establishedAt: new Date() },
];

const App: FC = () => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <Graph nodes={nodes} connections={connections} />
  </div>
);

export default App;

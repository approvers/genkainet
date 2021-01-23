import React, { FC, useState } from "react";
import { INode, IConnection } from "@approvers/libgenkainet";
import Graph from "./components/Graph";
import InputField from "./components/InputField";
import Messages from "./components/Messages";
import Console from "./components/Console";
import { Message } from "./shared";

import "./global.scss";
import styles from "./App.module.scss";

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
const messages: Message[] = [
  { from: "0", message: "Message1" },
  { from: "1", message: "Message2" },
  { from: "5", message: "Message3" },
  { from: "0", message: "Message4" },
  { from: "3", message: "Message5" },
  { from: "2", message: "Message6" },
  { from: "4", message: "Message7" },
  { from: "5", message: "Message8" },
];
const myId = "0";

const App: FC = () => {
  const [destination, setDestination] = useState<string | null>(null);
  return (
    <div className={styles.root}>
      <Graph
        nodes={nodes}
        connections={connections}
        onNodeClick={(nodeId) => setDestination(nodeId)}
      />
      <Console>
        <InputField destination={destination} onSendClick={(message) => console.log(message)} />
        <Messages messages={messages} myId={myId} />
      </Console>
    </div>
  );
};

export default App;

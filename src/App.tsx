import React, { FC, useEffect, useState } from "react";
import { INode, IConnection, MessagePacket } from "@approvers/libgenkainet";
import Graph from "./components/Graph";
import InputField from "./components/InputField";
import Messages from "./components/Messages";
import Console from "./components/Console";
import { Message } from "./shared";

import "./global.scss";
import styles from "./App.module.scss";
import { Network } from "./network/network";

const App: FC = () => {
  const [destination, setDestination] = useState<string | null>(null);
  const [nodes, setNodes] = useState<string[]>([]);
  const [connections, setConnections] = useState<IConnection[]>([]);
  const [network, setNetwork] = useState<Network | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    const asyncFunc = async () => {
      const network = await Network.create("ws://localhost:3000/discover", {
        handle: (from, msg) => {
          setMessages((prev) => prev.concat({ from: from.id, message: msg }));
        },
      });

      setNetwork(network);

      const connections = network.node.network.connections;
      const duplicatedNodes = connections.flatMap((connection) => [
        connection.from.id,
        connection.to.id,
      ]);
      setNodes([...new Set(duplicatedNodes)]);
      setConnections((prev) => prev.concat(connections));

      network.node.network.onUpdated = () => {
        const connections = network.node.network.connections;
        const duplicatedNodes = connections.flatMap((connection) => [
          connection.from.id,
          connection.to.id,
        ]);
        setNodes([...new Set(duplicatedNodes)]);
        setConnections((prev) => prev.concat(connections));
      };
    };
    asyncFunc().catch(console.error);
  }, []);
  const handleSendClick = (message: string) => {
    if (!network) return;
    let toNode: INode | undefined = undefined;
    if (destination) {
      const nodes = connections.flatMap(({ from, to }) => [from, to]);
      toNode = nodes.find(({ id }) => id === destination);
    }
    network.node.send(new MessagePacket(message, network.node, toNode));
  };
  return (
    <div className={styles.root}>
      <Graph
        nodes={nodes}
        connections={connections}
        onNodeClick={(nodeId) => setDestination(nodeId)}
        onBackgroundClick={() => setDestination(null)}
      />
      <Console>
        <InputField destination={destination} onSendClick={handleSendClick} />
        <Messages messages={messages} myId={network?.node.id} />
      </Console>
    </div>
  );
};

export default App;

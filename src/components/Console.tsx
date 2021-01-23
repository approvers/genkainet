import React, { FC, useState } from "react";
import Message from "./Message";
import { Message as MessageType } from "../shared";

type Props = {
  myId: string;
  messages: MessageType[];
  to: string | null;
  onSendClick: (message: string) => void;
};

const Console: FC<Props> = ({ messages, to, onSendClick, myId }) => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <Message key={index} message={message} isMine={myId === message.from} />
        ))}
      </div>
      <div>
        <textarea value={message} onChange={({ target: { value } }) => setMessage(value)} />
        <button onClick={() => onSendClick(message)} disabled={to != null}>
          Send{to ? ` to ${to}` : ""}
        </button>
      </div>
    </div>
  );
};

export default Console;

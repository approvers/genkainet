import React, { FC, useState } from "react";
import { Message } from "../shared";

type Props = {
  messages: Message[];
  to: string | null;
  onSendClick: (message: string) => void;
};

const Console: FC<Props> = ({ messages, to, onSendClick }) => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <div>
        {messages.map(({ from, message }, index) => (
          <div key={index}>
            <div>{from}</div>
            <div>{message}</div>
          </div>
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

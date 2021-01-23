import React, { FC } from "react";
import { Message } from "../shared";

type Props = {
  messages: Message[];
  myId: string;
};

const Messages: FC<Props> = ({ messages, myId }) => (
  <div>
    {messages.map(({ from, message }, index) => (
      <div key={index}>
        <div>
          {from}
          {from === myId ? "(me)" : ""}
        </div>
        <div>{message}</div>
      </div>
    ))}
  </div>
);

export default Messages;

import React, { FC } from "react";
import Message from "./Message";
import InputField from "./InputField";
import { Message as MessageType } from "../shared";

type Props = {
  myId: string;
  messages: MessageType[];
  to: string | null;
  onSendClick: (message: string) => void;
};

const Console: FC<Props> = ({ messages, to, onSendClick, myId }) => {
  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <Message key={index} message={message} isMine={myId === message.from} />
        ))}
      </div>
      <InputField destination={to} onSendClick={onSendClick} />
    </div>
  );
};

export default Console;

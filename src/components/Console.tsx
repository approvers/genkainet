import React, { FC } from "react";
import Messages from "./Messages";
import InputField from "./InputField";
import { Message } from "../shared";

type Props = {
  myId: string;
  messages: Message[];
  to: string | null;
  onSendClick: (message: string) => void;
};

const Console: FC<Props> = ({ messages, to, onSendClick, myId }) => {
  return (
    <div>
      <Messages messages={messages} myId={myId} />
      <InputField destination={to} onSendClick={onSendClick} />
    </div>
  );
};

export default Console;

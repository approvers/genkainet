import React, { FC } from "react";
import { Message as MessageType } from "../shared";

type Props = {
  message: MessageType;
  isMine: boolean;
};

const Message: FC<Props> = ({ message: { from, message }, isMine }) => (
  <div>
    <div>{isMine ? `${from} (me)` : from}</div>
    <div>{message}</div>
  </div>
);

export default Message;

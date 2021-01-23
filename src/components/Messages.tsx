import React, { FC } from "react";
import { Message } from "../shared";

type Props = {
  message: Message;
  isMine: boolean;
};

const Messages: FC<Props> = ({ message: { from, message }, isMine }) => (
  <div>
    <div>{isMine ? `${from} (me)` : from}</div>
    <div>{message}</div>
  </div>
);

export default Messages;

import React, { FC } from "react";
import { Message } from "../shared";

import styles from "./Messages.module.scss";

type Props = {
  messages: Message[];
  myId?: string;
};

const Messages: FC<Props> = ({ messages, myId }) => (
  <div className={styles.messagesWrapper}>
    <div className={styles.messages}>
      {messages.map(({ from, message }, index) => (
        <div key={index} className={styles.message}>
          <div>
            {from}
            {from === myId ? "(me)" : ""}
          </div>
          <div>{message}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Messages;

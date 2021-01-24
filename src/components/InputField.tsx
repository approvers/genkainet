import React, { FC, useState } from "react";

import styles from "./InputField.module.scss";

type Props = {
  destination: string | null;
  onSendClick: (message: string) => void;
};

const InputField: FC<Props> = ({ destination, onSendClick }) => {
  const [message, setMessage] = useState("");
  const sendButtonText = destination ? `Send to ${destination}` : "Send";
  return (
    <div className={styles.inputField}>
      <textarea
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        rows={1}
        placeholder="Message ..."
      />
      <button onClick={() => onSendClick(message)} disabled={destination == null}>
        {sendButtonText}
      </button>
    </div>
  );
};

export default InputField;

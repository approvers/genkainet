import React, { FC, useState } from "react";

type Props = {
  destination: string | null;
  onSendClick: (message: string) => void;
};

const InputField: FC<Props> = ({ destination, onSendClick }) => {
  const [message, setMessage] = useState("");
  const sendButtonText = destination ? `Send to ${destination}` : "Send";
  return (
    <div>
      <textarea value={message} onChange={({ target: { value } }) => setMessage(value)} />
      <button onClick={() => onSendClick(message)}>{sendButtonText}</button>
    </div>
  );
};

export default InputField;

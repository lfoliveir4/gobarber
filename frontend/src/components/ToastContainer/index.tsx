import React from "react";
import { useTransition } from "react-spring";

import * as Styles from "./styles";

import Toast from "./Toast";
import { ToastMessage, useToast } from "../../context/ToastContext";

interface ToastContainerProps {
  messages: ToastMessage[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: "-120%", opacity: 0 },
      enter: { right: "0%", opacity: 1 },
      leave: { right: "-120%", opacity: 0 },
    }
  );

  return (
    <Styles.Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Styles.Container>
  );
};

export default ToastContainer;

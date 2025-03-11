import { createContext, useContext, useState } from "react";

const ChatModalContext = createContext();

export const ChatModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ChatModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ChatModalContext.Provider>
  );
};

export const useChatModal = () => useContext(ChatModalContext);

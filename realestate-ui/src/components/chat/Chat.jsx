import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketConnection";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chatData }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEnfRef = useRef();



  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEnfRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, receiver });
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });

      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat?.receiver?.id || null, // Use optional chaining with fallback
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }

    return () => {
      socket?.off("getMessage");
    };
  }, [socket, chat]);



  

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chatData.length === 0 ? (
          <>
          <p>No chats available</p>
          
          </>
        ) : (
          chatData?.map((c) => (
            <div
              className="message"
              key={c.id} // ✅ Use 'c.id' instead of 'chat.id'
              style={{
                backgroundColor:
                  c.seenBy?.includes(currentUser.id) || chat?.id === c.id // ✅ Use 'c.seenBy'
                    ? "white"
                    : "#fecd514e",
              }}
              onClick={() => handleOpenChat(c.id, c.receiver)} // ✅ Use 'c.id' and 'c.users'
            >
              <img src={c.receiver?.avatar || "/noavatar.jpg"} alt="" />
              <span>{c?.receiver?.username}</span>
              <p>{c?.lastMessage}</p>
            </div>
          ))
        )}
      </div>

      {chat && (
        <div className="chatBox"  >
          <div className="top">
            <div className="user">
              <img src={chat.receiver?.avatar || "/noavatar.jpg"} alt="" />
              {chat?.receiver?.username}{" "}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",

                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEnfRef}> </div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;

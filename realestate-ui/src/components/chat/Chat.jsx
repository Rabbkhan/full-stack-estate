import { useContext, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";

function Chat({ chatData }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);

  console.log(chatData);

  const handleOpenChat = async (id, users) => {
    try {
      const res = await apiRequest("/chats/" + id);
      setChat({ ...res.data, users });
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
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chatData.length === 0 ? (
          <p>No chats available</p>
        ) : (
         chatData?.map((c) => (
  <div
    className="message"
    key={c.id} // ✅ Use 'c.id' instead of 'chat.id'
    style={{
      backgroundColor: c.seenBy?.includes(currentUser.id) // ✅ Use 'c.seenBy'
        ? "white"
        : "#fecd514e",
    }}
    onClick={() => handleOpenChat(c.id, c.users)} // ✅ Use 'c.id' and 'c.users'
  >
    <img src={c.users[0]?.avatar || "/noavatar.jpg"} alt="" />
    <span>{c?.users[0]?.username}</span>
    <p>{c?.lastMessage}</p>
  </div>
))

        )}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.users[0]?.avatar || "/noavatar.jpg"} alt="" />
              {chat?.users[0]?.username}{" "}
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

import { Link, Navigate, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const [postResponse, setPostResponse] = useState({});
  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const postRes = await apiRequest(
          `/users/profilePosts/${currentUser.id}`
        );
        console.log(postRes.data);

        setPostResponse(postRes.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true);

        const chatRes = await apiRequest("/chats");
        // console.log("Fetched chats:", chatRes.data);

        setChat(chatRes.data); // Save chat data to state
      } catch (err) {
        setError(err.message || "Something went wrong while fetching chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, []);

  return !currentUser ? (
    <Navigate to="/login" />
  ) : (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              {" "}
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser?.avatar || "/naovatar.webp"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={"/add"}>
              <button>Create New Post</button>
            </Link>
          </div>
          <List posts={postResponse.userPosts} loading={loading} />{" "}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={postResponse.savedPosts} loading={loading} />{" "}
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat chatData={chat} />{" "}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

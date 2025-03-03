import { Link, Navigate, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    !currentUser ? (<Navigate to="/login" />): (
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
            <List />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List />
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat />
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;

import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setisLoading(true);

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    // console.log(username, email, password)

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      updateUser(res.data);
      navigate("/");

      setError(false);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome Back!</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Enter Username"
          />
          <input name="password" type="password" placeholder="Enter Password" />
          <button disabled={isLoading}>
            {isLoading ? "loading..." : "Login"}
          </button>
          {error && <span className="error">{error}</span>}

          <Link to="/register">Don’t have an account? Sign up</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Login Illustration" />
      </div>
    </div>
  );
}

export default Login;

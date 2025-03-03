import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from '../../lib/apiRequest'


const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setisLoading(true)
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // console.log(username, email, password)

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });

      navigate("/login");

      setError(false);
    } catch (error) {
      setError(error.response.data.message);
    }finally{
      setisLoading(false)
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Enter Username" />
          <input name="email" type="email" placeholder="Enter Email" />
          <input name="password" type="password" placeholder="Enter Password" />
          <button disabled={isLoading}>

          {isLoading ? "loading..." : "Register"}

          </button>
          {error && <span className="error">{error}</span>}
          <Link to="/login">Already have an account? Login</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Register Illustration" />
      </div>
    </div>
  );
};

export default Register;

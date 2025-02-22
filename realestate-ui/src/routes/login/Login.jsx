import "./login.scss";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="formContainer">
        <form>
          <h1>Welcome Back!</h1>
          <input name="username" type="text" placeholder="Enter Username" />
          <input name="password" type="password" placeholder="Enter Password" />
          <button>Login</button>
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

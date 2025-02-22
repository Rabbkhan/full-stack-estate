import "./register.scss";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="register">
      <div className="formContainer">
        <form>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Enter Username" />
          <input name="email" type="email" placeholder="Enter Email" />
          <input name="password" type="password" placeholder="Enter Password" />
          <button>Register</button>
          <Link to="/login">Already have an account? Login</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Register Illustration" />
      </div>
    </div>
  );
}

export default Register;

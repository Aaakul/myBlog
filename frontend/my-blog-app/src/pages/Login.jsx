import { React, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFieldEmpty = (field) => field.trim() === "";

  const isInputsValid = () => {
    return [inputs.username, inputs.password].some(isFieldEmpty) ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="Auth">
      <h1>Welcome back</h1>
      <form>
        <input
          required
          type="text"
          placeholder="*Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="*Password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit} disabled={!isInputsValid()}>
          Login
        </button>
        {err && <p>{err}</p>}
        <span>
          Just browsing? <Link to="/">Back to home</Link>
        </span>
        <span>
          New user? <Link to="/Reg">Register</Link>
        </span>
        <span>
          Forgot your username or password?{" "}
          <Link to="/LoginTrouble">Click here</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

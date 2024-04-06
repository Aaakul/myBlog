import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Reg = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isInputsValid = () => {
    const isFieldEmpty = (field) => field.trim() === "";
    return [inputs.username, inputs.email, inputs.password].some(isFieldEmpty)
      ? false
      : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/reg", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="Auth">
      <h1>Start your blog today</h1>
      <form>
        <input
          required
          type="text"
          placeholder="*Username 4-16 characters"
          name="username"
          onChange={handleChange}
          minLength="4"
          maxLength="16"
        />
        <input
          required
          type="email"
          placeholder="*Email"
          name="email"
          onChange={handleChange}
          autoComplete="email"
          minLength="5"
          maxLength="45"
        />
        <input
          required
          type="email"
          placeholder="*Confirm email"
          name="email2"
          autoComplete="email"
          minLength="5"
          maxLength="45"
        />
        <input
          required
          type="password"
          placeholder="*Password  4-16 characters"
          name="password"
          onChange={handleChange}
          minLength="4"
          maxLength="16"
        />
        <input
          required
          type="password"
          placeholder="*Confirm password"
          name="password2"
          minLength="4"
          maxLength="16"
        />
        <button onClick={handleSubmit} disabled={!isInputsValid()}>
          Register
        </button>
        <span>
          Just browsing? <Link to="/">Back to home</Link>
        </span>
        {err && <p>{err}</p>}
        <span>
          Already have an account? <Link to="/Login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Reg;

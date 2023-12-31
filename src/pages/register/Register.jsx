import { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASE_URL } from "../../context/Constant";

const Register = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);
  useEffect(() => {
    if (admin) {
      navigate("/");
    }
  });
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setCredentials((prev) => ({ ...prev, isAdmin: true }));
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, credentials);
      console.log(res.data);
      if (res.data) {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "An error occurred");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <>
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            id="username"
            placeholder="Username"
            className="lInput"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            id="email"
            placeholder="Email"
            className="lInput"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            id="password"
            placeholder="Password"
            className="lInput"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            id="confirmPassword"
            placeholder="Confirm Password"
            className="lInput"
          />
          <button
            disabled={isLoading}
            onClick={handleClick}
            className="lButton"
          >
            Register
          </button>
          {error && <span>{error}</span>}
        </div>
      </div>
    </>
  );
};

export default Register;

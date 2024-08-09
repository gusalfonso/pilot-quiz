import React, { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { authenticateUser } from "../services/dblogin";
import "../styles/LoginCard.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.length > 3 && password.length > 3) {
      try {
        const isAuthenticated = await authenticateUser(email, password);

        if (isAuthenticated) {
          login(email);
          localStorage.setItem("userEmail", email);
          toast.success("Sucess!", { duration: 1500 });
          setEmail("");
          setPassword("");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          console.log("Error: Credenciales incorrectas.");
        }
      } catch (error) {
        console.error("Error al autenticar:", error);
      }
    } else {
      console.log("Error: Verifica que los campos sean correctos.");
    }
  };

  return (
    <>
      <div className="login-card-container">
        <div className="card">
          <div className="homeicon"></div>
          <div className="card-logo">
            <img src="/src/assets/planeicon.svg" alt="planeicon" />
          </div>
          <div className="card-header">
            <h1>Sign In</h1>
            <div>Please login to use the platform</div>
          </div>
          <form className="login-card-form" onSubmit={handleSubmit}>
            <div className="form-item">
              <input
                type="text"
                placeholder="Enter Email"
                id="emailForm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                placeholder="Enter Password"
                id="passwordForm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-item-other">
              <a href="#">I forgot my password!</a>
            </div>
            <button className="std-btn" type="submit">
              Sign In
            </button>
          </form>
          <div className="login-card-footer">
            Don't have an account?{" "}
            <a href="/register">Create a free account.</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginCard;

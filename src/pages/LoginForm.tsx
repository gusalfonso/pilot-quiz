import React, { useState } from "react";
import { useAuthStore } from "../store/AuthStore";
import { authenticateUser } from "../services/dblogin";
import "../styles/LoginCard.css";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";

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
          toast.success("¡Éxito!", { duration: 1500 });
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
        <Card title="Iniciar sesión">
          <form className="login-card-form" onSubmit={handleSubmit}>
            <div className="form-item">
              <input
                type="text"
                placeholder="Introduce tu correo electrónico"
                id="emailForm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-item">
              <input
                type="password"
                placeholder="Introduce tu contraseña"
                id="passwordForm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* <div className="form-item-other">
              <a href="#">¡Olvidé mi contraseña!</a>
            </div> */}
            <button className="std-btn" type="submit">
              Iniciar sesión
            </button>
          </form>
          <div className="login-card-footer">
            ¿No tienes una cuenta?{" "}
            <Link to="/register">Crea una cuenta gratuita.</Link>
          </div>
        </Card>
      </div>
    </>
  );
}

export default LoginCard;

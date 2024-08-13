import React, { useState } from "react";
import "../styles/RegisterCard.css";
import { createUser, createUsersTable } from "../services/dbregister";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    // TO DO - cambiar por limpieza nativa
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Error: Las contraseñas no coinciden.");
      return;
    }

    if (email !== confirmEmail) {
      console.log("Error: Los correos no coinciden.");
      return;
    }

    try {
      await createUsersTable();
      await createUser({
        username,
        name: firstName,
        surname: lastName,
        email,
        password,
      });

      toast.success("¡Registro exitoso!", { duration: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      clearForm();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="register-card-container">
      <Card
        title="Registrarse"
        subtitle="Por favor, completa los detalles para crear una cuenta"
      >
        <form className="register-card-form" onSubmit={handleSubmit}>
          <div className="form-item">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="Apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="email"
              placeholder="Confirmar correo electrónico"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="std-btn">
            Registrarse
          </button>
        </form>
        <div className="register-card-footer">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí.</Link>
        </div>
      </Card>
    </div>
  );
}

export default RegisterForm;

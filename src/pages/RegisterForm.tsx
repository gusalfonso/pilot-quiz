import React, { useState } from "react";
import "../styles/RegisterCard.css";
import { createUser, createUsersTable } from "../services/dbregister";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
    //TO DO - trocar por clear nativo
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

      toast.success("Registro exitoso!", { duration: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      clearForm();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div className="register-card-container">
      <div className="card">
        <div className="card-logo">
          <img src="/src/assets/planeicon.svg" alt="planeicon" />
        </div>
        <div className="card-header">
          <h1>Sign Up</h1>
          <div>Please fill in the details to create an account</div>
        </div>
        <form className="register-card-form" onSubmit={handleSubmit}>
          <div className="form-item">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="email"
              placeholder="Confirm Email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="std-btn">
            Sign Up
          </button>
        </form>
        <div className="register-card-footer">
          Already have an account? <a href="/login">Sign In here.</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

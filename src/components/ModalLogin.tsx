// src/components/BasicModal.tsx
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaUserAlt } from "react-icons/fa";
import { useUserStore } from "../store/user";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí deberías añadir tu lógica de autenticación
    const token = "dummyToken"; // Reemplaza esto con el token real después de autenticarte
    login(username, token);
    console.log(username, token);
    handleClose();
  };

  return (
    <div>
      <button className="login-btn std-btn" onClick={handleOpen}>
        <FaUserAlt />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

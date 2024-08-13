import { FaHome, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";
import "./SettingBar.css";
import { MdLogout } from "react-icons/md";

export default function SettingBar() {
  const location = useLocation();
  const { username, isAuthenticated, logout } = useAuthStore();

  const handleLogOut = () => {
    console.log(username);
    logout();
    console.log(username);
  };

  console.log(username);

  return (
    <div className="settings-container">
      {!isAuthenticated ? (
        <Link to={"/login"}>
          <FaUser className="user" color="black" />
        </Link>
      ) : (
        <Link to={"/"} onClick={handleLogOut}>
          <MdLogout className="user" color="black" />
        </Link>
      )}

      {isAuthenticated && username === "alfonsgustavo@gmail.com" && (
        <Link to={"/settings"}>
          <FaGear className="settings" color="black" />
        </Link>
      )}

      {location.pathname !== "/" && (
        <Link to={"/"}>
          <FaHome className="home" color="black" />
        </Link>
      )}
    </div>
  );
}

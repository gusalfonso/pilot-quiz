import "../styles/Card.css";
import { CardProps } from "../types";
// import { FaHome, FaUser } from "react-icons/fa";

export default function Card({ title, children }: CardProps) {
  return (
    <>
      <div className="card">
        {/* <div className="settings">
          <Link >
            <FaHome />
          </Link>
          <Link>
            <FaUser />
          </Link>
        </div> */}
        <div className="card-logo">
          <img src="/src/assets/planeicon.svg" alt="planeicon" />
        </div>
        <div className="card-header">
          <h1>{title}</h1>
        </div>
        {children}
      </div>
    </>
  );
}

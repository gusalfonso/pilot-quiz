import "./Card.css";
import { CardProps } from "../../types";
import SettingBar from "../SettingsBar/SettingBar";

export default function Card({ title, children, subtitle }: CardProps) {
  return (
    <>
      <div className="card">
        <SettingBar />
        <div className="card-logo">
          <img src="/img/planeicon.svg" alt="planeicon" />
        </div>
        <div className="card-header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
    </>
  );
}

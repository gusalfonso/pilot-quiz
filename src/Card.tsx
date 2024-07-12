import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

export const Card = ({children}: CardProps) => (
    <div className="card-container">
        {children}
    </div>
)
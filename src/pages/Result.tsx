import confetti from "canvas-confetti";
import Card from "../components/Card/Card";

export default function Result() {
  setTimeout(() => {
    confetti;
  }, 200);
  return (
    <Card title={"Felicitaciones!"}>
      <div>¡Has Ganado!</div>
    </Card>
  );
}


// Compteur avec reset et decrement (useState)
// Objectif : ajouter -1 et Reset.
// Contraintes : empêcher le passage sous 0 (optionnel).
import { useState } from "react";
export default function Exercice2() {
  const [Count, setCount] = useState(1);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-lg font-bold">Valeur : {Count}</div>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(Count - 1)}
          disabled={Count === 0}
          className="btn btn-primary"
        >
          -
        </button>
        <button
          onClick={() => setCount(Count + 1)}
          className="btn btn-primary"
        >
          +
        </button>
      </div>
    </div>
  );
}

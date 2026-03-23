// Compteur basique (useState)
// Objectif : créer un bouton qui incrémente un compteur.
// Contraintes : état initial 0, bouton +1, affichage du nombre.

import { useState } from "react";
export default function Exercice1() {
  const [Count,setCount]=useState(0);

  return (
    <>
       <div className="compteur-container text-center p-8">
        voila le compteur : {Count}
        <br />
        <button className="btn btn-primary" onClick={() => setCount(Count + 1)}>Change Counter</button>
       </div>

    </>
  );
}

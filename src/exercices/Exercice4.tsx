// Affichage conditionnel via props
// Objectif : un composant Badge affiche “Actif” ou “Inactif” selon une prop booléenne.
// Contraintes : style différent selon l’état.
export default function Exercice4({ isActive, SetisActive }: { isActive: boolean; SetisActive: (value: boolean) => void }) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body flex flex-col gap-4 items-center">
        <h2>
          Statut :
          <span className={isActive ?"badge badge-success ml-2": "badge badge-error ml-2"}>
           
            {isActive ? "Actif" : "Inactif"}          

          </span>
          <button onClick={() => SetisActive(!isActive)}>Toggle Statut</button>

             {/* onChange={e => setSearch(e.target.value)} */}

        </h2>
        {/* <h2>
          Statut :
          <span className={isActive ? "badge badge-success ml-2" : "badge badge-error ml-2"}>
            {isActive ? "Actif" : "Inactif"}
          </span>
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => SetisActive(!isActive)}
        >
          Toggle Statut
        </button> */}
      </div>
    </div>
  );
}

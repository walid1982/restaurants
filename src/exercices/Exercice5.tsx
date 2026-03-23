// Liste statique + rendu d’items (props)
// Objectif : List reçoit un tableau d’objets en props et rend ListItem.

import { ListItem } from "./child-exercices/Child-Ex5";
// Contraintes : clés uniques (key), message “Aucun élément” si vide.
export default function Exercice5() {
  const listItems = ["Item 1", "Item 2", "Item 3", "Item 4"];
  return (
    <>
      <div>
        <h2 className="font-bold mb-4">Liste des éléments :</h2>
        {listItems.length === 0 ? (
          <p>Aucun élément</p>
        ) : (
          <ul>
            {listItems.map((item, index) => (
              <ListItem key={index} item={item} />
            ))}
          </ul>
        )}
      </div>


    </>
  );
}

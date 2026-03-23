// Recherche client‐side (useState + props)
// Objectif : un champ de recherche filtre une liste reçue en props.
// Contraintes : filtrage insensible à la casse, affichage du nombre de résultats.


export default function SearchElement({ SearchElement, setSearchElement }: { SearchElement: string; setSearchElement: (value: string) => void })
{
  return (
    <>
    <form>
      <div className="mb-6">
        <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recherche</label>
        <input type="text" id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tapez votre recherche ici..." required             
        value={SearchElement} onChange={e => setSearchElement(e.target.value)}/>
      </div>
    </form>
    </>
  );
}

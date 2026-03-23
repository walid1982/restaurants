// Champ de saisie contrôlé (props + useState)
// Objectif : un <Input> enfant reçoit value et onChange en props.
// Contraintes : lever un événement au parent pour mettre à jour l’état.
export default function Exercice3({ Testinput, setTestinput }: { Testinput: string; setTestinput: (value: string) => void }) {
  return (
    <>
    <form>
      <label htmlFor="controlledInput" className="block mb-2 font-bold">Champ de saisie contrôlé :</label>
      <input
        type="text"
        id="controlledInput"
        className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
        placeholder="Tapez quelque chose..."
        value={Testinput}
        onChange={(e) => setTestinput(e.target.value)}
      />
    </form>
    </>
  );
}
// Exemple d'utilisation dans un composant parent :
// const [Testinput, setTestinput] = useState("");
// <Exercice3 Testinput={Testinput} setTestinput= {setTestinput}  />

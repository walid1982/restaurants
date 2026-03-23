// Fetch d’une API (useEffect + useState)
// Objectif : récupérer des données (ex. posts) et les afficher.
// Contraintes : état loading, error, effet avec dépendances correctement définies.

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export default function Exercice7() {
  const ApiUrl = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(ApiUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Erreur réseau");
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "Erreur inconnue");
        setLoading(false);
      });
  }, [ApiUrl]);

  return (
    <div className="text-center p-8">
      <h2>Fetch d’une API</h2>
      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">Erreur : {error}</p>}
      {!loading && !error && (
        <ul>
          {users.length === 0 ? (
            <li>Aucun utilisateur trouvé.</li>
          ) : (
            users.map((user) => (
              <li key={user.id}>{user.id} - {user.name} : {user.email}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

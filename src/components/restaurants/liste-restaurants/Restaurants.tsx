import { useEffect, useState } from "react";
import type { Resto } from "../../Resto";
import "./Restaurant.css";
import { Link } from "react-router-dom";
import Search from "../search-restaurant/search";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Resto[]>([]);
  const [search, setSearch] = useState('');
  const filteredRestaurants = restaurants.filter((resto) =>
    resto.restaurantName.toLowerCase().includes(search.toLowerCase())
  );
  const apiUrl = "http://localhost:3000/restaurants";
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error fetching restaurants:", error));
  }, []);
  const deleteRestaurant = (id: number) => {
    fetch(`http://localhost:3000/restaurants/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setRestaurants((prev) => prev.filter((resto) => resto.id !== id));
    }).catch((error) => console.error("Error deleting restaurant:", error));
  };

  return (
    <div>
      <div className="restaurants-header">
        <h1>Liste des Restaurants</h1>
        {/* Search bar component */}
        <Search search={search} setSearch={setSearch} />
        <p>Découvrez les meilleurs restaurants près de chez vous</p>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.map((resto) => (
          <div className="restaurant-card" key={resto.id}>
            <Link to={`/restaurants/${resto.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              {resto.image ? (
                <img
                  src={resto.image}
                  alt={resto.restaurantName}
                  className="restaurant-img"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginBottom: "0.7rem",
                  }}
                />
              ) : null}
              <div className="restaurant-name">{resto.restaurantName}</div>
              <div className="restaurant-info">{resto.restaurantInfo}</div>
              <div className="stars">
                {"★".repeat(resto.stars) + "☆".repeat(5 - resto.stars)}
              </div>
              <span className="speciality">{resto.speciality}</span>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <button
                className="btn btn-error btn-sm"
                title="Supprimer"
                onClick={() => deleteRestaurant(resto.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <button className="btn btn-warning btn-sm" title="Modifier">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.293-6.293a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414L11 15H9v-2z" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

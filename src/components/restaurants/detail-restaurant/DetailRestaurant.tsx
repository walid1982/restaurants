import { useEffect, useState } from "react";
import type { Resto } from "../../Resto";

import { useParams } from "react-router-dom";
export default function DetailRestaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Resto | null>(null);
  const apiUrl = `http://localhost:3000/restaurants/${id}`;
  useEffect(() => {
    if (id) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setRestaurant(data);
        })
        .catch((error) =>
          console.error("Error fetching restaurant details:", error)
        );
    }
  }, [id]);
  if (!restaurant) {
    return <div className="text-center p-8">Chargement...</div>;
  }

  return (
    <div
      className="detail-container"
      style={{
        width: "100%",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        padding: "2rem",
      }}
    >
      <div
        className="detail-header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        <img
          src={restaurant.image}
          alt={restaurant.restaurantName}
          style={{
            width: "50%",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          }}
        />
        <div>
          <h2
            style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "#222" }}
          >
            {restaurant.restaurantName}
          </h2>
          <div style={{ color: "#666", marginBottom: "0.5rem" }}>
            {restaurant.restaurantInfo}
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              color: "#f5b301",
              marginBottom: "0.5rem",
            }}
          >
            {"★".repeat(restaurant.stars) + "☆".repeat(5 - restaurant.stars)}
          </div>
          <div
            style={{
              fontWeight: "bold",
              color: "#2a7d46",
              marginBottom: "0.5rem",
            }}
          >
            {restaurant.speciality}
          </div>
          <div style={{ color: "#444", marginBottom: "0.5rem" }}>
            Horaires: {restaurant.opening} - {restaurant.closing}
          </div>
          <div style={{ color: "#444" }}>
            Prix à partir de {" "}
            <span style={{ fontWeight: "bold", color: "#e67e22" }}>
              {restaurant.priceFrom}€
            </span>
          </div>
        </div>
      </div>
      <div className="detail-dishes">
        <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>
          Plats proposés
        </h3>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {restaurant.plats &&
            restaurant.plats.map((plat, idx) => (
              <div
                key={plat.nom + '-' + idx}
                style={{
                  background: "#fafafa",
                  borderRadius: "8px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                  padding: "1rem",
                  minWidth: "160px",
                  textAlign: "center"
                }}
              >
                {plat.image ? (
                  <img
                    src={plat.image}
                    alt={plat.nom}
                    style={{
                      width: "100%",
                      maxWidth: "120px",
                      borderRadius: "6px",
                      marginBottom: "0.5rem",
                    }}
                  />
                ) : null}
                <div style={{ fontWeight: "bold", color: "#444" }}>
                  {plat.nom}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Restaurants from "../restaurants/liste-restaurants/Restaurants";
import DetailRestaurant from "../restaurants/detail-restaurant/DetailRestaurant";
import AddRestaurant from "../restaurants/add-restaurant/add-restaurant";


export default function Navigation() {
  return (
    <BrowserRouter>
      <nav className="main-nav flex flex-col md:flex-row items-center gap-4 md:gap-8 py-4 px-6 bg-base-200 rounded-b-xl shadow">
        <div className="nav-logo text-xl font-bold mr-4"><Link to="/restaurants">R🍽️ SixApp</Link></div>
        {/* <div className="flex-1 w-full max-w-lg"><Search /></div> */}
        <ul className="nav-links flex gap-4">
          <li><Link to="/restaurants" className="link link-hover">Restaurants</Link></li>
          <li><Link to="/restaurants/add" className="link link-hover">Ajouter Un Resto</Link></li>
        </ul>
      </nav>
      <div className="container mx-auto p-6 bg-white rounded shadow-md mt-6">
        <Routes>
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/" element={<Navigate to="/restaurants" replace />} />
          <Route path="/restaurants/:id" element={<DetailRestaurant />} />
          <Route path="/restaurants/add" element={<AddRestaurant />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

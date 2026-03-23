import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { Resto } from '../../Resto';

const initialFormState: Omit<Resto, 'id'> = {
  image: '',
  restaurantName: '',
  restaurantInfo: '',
  stars: 1,
  speciality: '',
  opening: '',
  closing: '',
  priceFrom: 0,
  plats: [{ nom: '', image: '' }],
};
const AddRestaurant: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Resto, 'id'>>(initialFormState);
  const [errors, setErrors] = useState<any>({});
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'restaurantName':
        if (!value.trim()) return 'Le nom est requis.';
        if (value.length < 2) return 'Le nom doit comporter au moins 2 caractères.';
        break;
      case 'restaurantInfo':
        if (!value.trim()) return "La description est requise.";
        break;
      case 'speciality':
        if (!value.trim()) return 'La spécialité est requise.';
        break;
      case 'image':
        if (!value.trim()) return "L'image est requise.";
        if (!/^https?:\/\//.test(value)) return 'Le lien de limage doit être une URL.';
        break;
      case 'opening':
        if (!value.trim()) return "L'heure d'ouverture est requise.";
        break;
      case 'closing':
        if (!value.trim()) return "L'heure de fermeture est requise.";
        break;
      case 'priceFrom':
        if (isNaN(value) || value < 0) return 'Le prix doit être positif.';
        break;
      case 'stars':
        if (isNaN(value) || value < 1 || value > 5) return 'Les étoiles doivent être entre 1 et 5.';
        break;
      default:
        break;
    }
    return '';
  };

  const validateForm = (form: Omit<Resto, 'id'>) => {
    const newErrors: any = {};
    Object.keys(form).forEach((key) => {
      if (key === 'plats') {
        newErrors.plats = form.plats.map((plat) => {
          const platErrors: any = {};
          if (!plat.nom.trim()) platErrors.nom = 'Nom du plat requis.';
          if (!plat.image.trim()) platErrors.image = 'Image du plat requise.';
          else if (!/^https?:\/\//.test(plat.image)) platErrors.image = 'URL du plat invalide.';
          return platErrors;
        });
      } else {
        const error = validateField(key, (form as any)[key]);
        if (error) newErrors[key] = error;
      }
    });
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
    setErrors((prev: any) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handlePlatChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const plats = prev.plats.map((plat, i) =>
        i === idx ? { ...plat, [name]: value } : plat
      );
      return { ...prev, plats };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    const newErrors = validateForm(form);
    setErrors(newErrors);
    // Vérifie s'il y a des erreurs dans les champs principaux ou dans les plats
    if (
      Object.keys(newErrors).some((k) => k !== 'plats' && newErrors[k]) ||
      (newErrors.plats && newErrors.plats.some((pe: any) => Object.keys(pe).length > 0))
    ) return;
    try {
      const response = await fetch('http://localhost:3000/restaurants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),

      });
      if (!response.ok) throw new Error('Erreur lors de l\'ajout du restaurant.');
      setSubmitSuccess('Restaurant ajouté avec succès!');
      setForm(initialFormState);
      navigate("/restaurants");
    } catch (error) {
      setSubmitError((error as Error).message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un Restaurant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom du restaurant */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="restaurantName">Nom</label>
          <input
            className={`w-full px-3 py-2 border ${errors.restaurantName ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            type="text"
            id="restaurantName"
            name="restaurantName"
            value={form.restaurantName}
            onChange={handleChange}
            placeholder="Nom du restaurant"
            autoComplete="off"
          />
          {errors.restaurantName && <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>}
        </div>
        {/* Description du restaurant */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="restaurantInfo">Description</label>
          <textarea
            className={`w-full px-3 py-2 border ${errors.restaurantInfo ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            id="restaurantInfo"
            name="restaurantInfo"
            value={form.restaurantInfo}
            onChange={handleChange}
            placeholder="Description du restaurant"
            autoComplete="off"
            rows={2}
          />
          {errors.restaurantInfo && <p className="text-red-500 text-sm mt-1">{errors.restaurantInfo}</p>}
        </div>
        {/* Spécialité du restaurant */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="speciality">Spécialité</label>
          <input
            className={`w-full px-3 py-2 border ${errors.speciality ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            type="text"
            id="speciality"
            name="speciality"
            value={form.speciality}
            onChange={handleChange}
            placeholder="Spécialité du restaurant"
            autoComplete="off"
          />
          {errors.speciality && <p className="text-red-500 text-sm mt-1">{errors.speciality}</p>}
        </div>
        {/* Image du restaurant (URL) */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="image">Image (URL)</label>
          <input
            className={`w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            type="text"
            id="image"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="URL de l'image du restaurant"
            autoComplete="off"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>
        {/* Horaires d'ouverture et fermeture */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-semibold mb-1" htmlFor="opening">Ouverture</label>
            <input
              className={`w-full px-3 py-2 border ${errors.opening ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              type="time"
              id="opening"
              name="opening"
              value={form.opening}
              onChange={handleChange}
            />
            {errors.opening && <p className="text-red-500 text-sm mt-1">{errors.opening}</p>}
          </div>
          <div className="w-1/2">
            <label className="block font-semibold mb-1" htmlFor="closing">Fermeture</label>
            <input
              className={`w-full px-3 py-2 border ${errors.closing ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              type="time"
              id="closing"
              name="closing"
              value={form.closing}
              onChange={handleChange}
            />
            {errors.closing && <p className="text-red-500 text-sm mt-1">{errors.closing}</p>}
          </div>
        </div>
        {/* Prix de base */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="priceFrom">Prix à partir de (€)</label>
          <input
            className={`w-full px-3 py-2 border ${errors.priceFrom ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            type="number"
            id="priceFrom"
            name="priceFrom"
            value={form.priceFrom}
            onChange={handleChange}
            min={0}
          />
          {errors.priceFrom && <p className="text-red-500 text-sm mt-1">{errors.priceFrom}</p>}
        </div>
        {/* Nombre d'étoiles */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="stars">Étoiles</label>
          <input
            className={`w-full px-3 py-2 border ${errors.stars ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
            type="number"
            id="stars"
            name="stars"
            value={form.stars}
            onChange={handleChange}
            min={1}
            max={5}
          />
          {errors.stars && <p className="text-red-500 text-sm mt-1">{errors.stars}</p>}
        </div>
        {/* Plats */}
        <div>
          <label className="block font-semibold mb-1">Plats</label>
          {form.plats.map((plat, idx) => (
            <div key={idx} className="mb-2 flex gap-2">
              <input
                className={`flex-1 px-3 py-2 border ${errors.plats && errors.plats[idx]?.nom ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                type="text"
                name="nom"
                value={plat.nom}
                onChange={(e) => handlePlatChange(idx, e)}
                placeholder="Nom du plat"
                autoComplete="off"
              />
              <input
                className={`flex-1 px-3 py-2 border ${errors.plats && errors.plats[idx]?.image ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
                type="text"
                name="image"
                value={plat.image}
                onChange={(e) => handlePlatChange(idx, e)}
                placeholder="URL de l'image du plat"
                autoComplete="off"
              />
              {/* Affichage des erreurs plats */}
              <div className="flex flex-col">
                {errors.plats && errors.plats[idx]?.nom && (
                  <span className="text-red-500 text-xs">{errors.plats[idx].nom}</span>
                )}
                {errors.plats && errors.plats[idx]?.image && (
                  <span className="text-red-500 text-xs">{errors.plats[idx].image}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Ajouter
        </button>
        {/* Error and success messages */}
        {submitError && <p className="text-red-500 text-center mt-2">{submitError}</p>}
        {submitSuccess && <p className="text-green-600 text-center mt-2">{submitSuccess}</p>}
      </form>
    </div>
  );
};

export default AddRestaurant;

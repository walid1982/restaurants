// Formulaire multi‐champs contrôlé (useState)
// Objectif : prénom/nom/email avec validation de base.
// Contraintes : désactiver le bouton Submit tant que invalid, affichage des erreurs.

import { useState } from "react";

export default function Exercice9() {
  type formtest = { id: number; prenom: string; nom: string; email: string };
  const initialFormState: Omit<formtest, "id"> = {
    prenom: "",
    nom: "",
    email: "",
  };
  const [form, setForm] = useState<Omit<formtest, "id">>(initialFormState);
  const [errors, setErrors] = useState<any>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const validateField = (name: string, value: any): string => {
    switch (name) {
      case "prenom":
        if (!value.trim()) return "Le prénom est requis.";
        if (value.length < 2)
          return "Le prénom doit comporter au moins 2 caractères.";
        break;
      case "nom":
        if (!value.trim()) return "Le nom est requis.";
        break;
      case "email":
        if (!value.trim()) return "L'email est requis.";
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    const newErrors: any = {};
    Object.entries(form).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok)
        throw new Error("Erreur lors de l'ajout du restaurant.");
      setSubmitSuccess("Restaurant ajouté avec succès!");
      setForm(initialFormState);
    } catch (error) {
      setSubmitError((error as Error).message);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-base-100 rounded shadow flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block mb-1">Prénom</label>
        <input
          value={form.prenom}
          onChange={handleChange}
          type="text"
          name="prenom"
          className={`w-full px-3 py-2 border ${
            errors.prenom ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      <div>
        <label className="block mb-1">Nom</label>
        <input
          value={form.nom}
          onChange={handleChange}
          type="text"
          name="nom"
          className={`w-full px-3 py-2 border ${
            errors.nom ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          value={form.email}
          onChange={handleChange}
          type="email"
          name="email"
          className={`w-full px-3 py-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      <button type="submit" className="btn btn-primary mt-2">
        Envoyer
      </button>
      {/* Error and success messages */}
      {submitError && (
        <p className="text-red-500 text-center mt-2">{submitError}</p>
      )}
      {submitSuccess && (
        <p className="text-green-600 text-center mt-2">{submitSuccess}</p>
      )}
    </form>
  );
}

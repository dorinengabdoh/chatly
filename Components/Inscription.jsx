import React, { useState } from 'react';
import { Send } from "lucide-react";

export const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motDePasse: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="mb-8 text-6xl font-bold text-[#1D7AF2]">Chatly</h1>

      <h2 className="mb-12 text-4xl font-semibold text-[#2D3748]">Inscription</h2>

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nom" className="mb-2 block text-xl font-medium text-[#2D3748]">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1D7AF2]"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-xl font-medium text-[#2D3748]">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1D7AF2]"
            />
          </div>

          <div>
            <label htmlFor="motDePasse" className="mb-2 block text-xl font-medium text-[#2D3748]">
              Mot de passe
            </label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={formData.motDePasse}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#1D7AF2]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#1D7AF2] py-4 text-xl font-semibold text-white transition-colors duration-200 hover:bg-[#1565D8]"
          >
            Inscription
          </button>

          <div className="mt-6 text-center">
            <p className="text-lg text-[#2D3748]">
              Vous avez un compte ?{' '}
              <a href="#" className="text-[#1D7AF2] hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

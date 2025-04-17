import { useState } from 'react'

export const Connexion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="mb-2 text-center text-4xl font-bold text-blue-500">
            Chatly
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Se connecter
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="relative mt-1 block w-full appearance-none rounded-md border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-3 text-lg font-medium text-white transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Connexion
            </button>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="text-lg font-medium text-blue-500 transition-colors duration-200 hover:text-blue-600"
            >
              Créer un compte
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}


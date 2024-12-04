import { Lock } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-full shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Área Administrativa
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuário
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              type="text"
              placeholder="Digite seu usuário"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 font-medium text-lg shadow-lg"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
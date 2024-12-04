import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AdminLogin } from './components/Admin/AdminLogin';
import { Banner } from './components/Banner/Banner';
import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { PromoBanner } from './components/PromoBanner/PromoBanner';

// Função fictícia para simular a verificação de autenticação
const isAuthenticated = () => {
  // Aqui você pode verificar um token ou contexto de autenticação
  // Exemplo fictício:
  return localStorage.getItem('auth_token') !== null;
};

// Componente de proteção de rota
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <AdminLogin />; // Redireciona para login se não estiver autenticado
  }
  return <>{children}</>; // Renderiza as rotas protegidas caso esteja autenticado
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50">
              <Banner />
              <PromoBanner />
              <main className="container mx-auto px-4 py-6">
                <ProductSlider />
              </main>
            </div>
          }
        />

        {/* Rota de login */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Rota protegida */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Banner } from './components/Banner/Banner';
import { PromoBanner } from './components/PromoBanner/PromoBanner';
import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            <Banner />
            <PromoBanner />
            <main className="container mx-auto px-4 py-6">
              <ProductSlider />
            </main>
          </div>
        } />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
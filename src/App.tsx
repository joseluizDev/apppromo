import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AdminLogin } from './components/Admin/AdminLogin';
import { Banner } from './components/Banner/Banner';
import NotFound from './components/NotFound/NotFound';
import { ProductSlider } from './components/ProductSlider/ProductSlider';
import { PromoBanner } from './components/PromoBanner/PromoBanner';

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
            <Route path="/admin" element={
          <div className="min-h-screen bg-gray-50">
            <AdminLogin />
            <PromoBanner />
            <main className="container mx-auto px-4 py-6">
              <ProductSlider />
            </main>
          </div>
        } />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Login } from './components/Admin/AdminLogin';
import BannerManager from './components/Admin/BannerEdit';
import EditarProduto from './components/Admin/EditarProduto';
import { Home } from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Reserva from './components/Reserva/Reserva';
import { UserProvider } from './context/context';
import middleware from './middleware'; // Import middleware function
interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = middleware();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editar/:id"
            element={
              <ProtectedRoute>
                <EditarProduto />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/Banner"
            element={
              <ProtectedRoute>
                <BannerManager />
              </ProtectedRoute>
            }
          />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;

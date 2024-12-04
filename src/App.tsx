import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AdminLogin } from './components/Admin/AdminLogin';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
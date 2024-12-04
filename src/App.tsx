import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Login } from './components/Admin/AdminLogin';
import { Home } from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

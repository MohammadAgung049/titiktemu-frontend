import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import AddEvent from './pages/AddEvent';
import AddUmkm from './pages/AddUmkm';
import EditEvent from './pages/EditEvent';
import EditUmkm from './pages/EditUmkm';
import CategoryManager from './pages/CategoryManager';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register'; 
import WelcomePage from './pages/WelcomePage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import UmkmPage from './pages/UmkmPage';
import EventPage from './pages/EventPage';
import ProfilePage from './pages/ProfilePage';
import TrendMarketPage from './pages/TrendMarketPage';
import ReviewPage from './pages/ReviewPage';
import DetailUmkmPage from './pages/DetailUmkmPage';
import DetailEventPage from './pages/DetailEventPage';

// Komponen Proteksi
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      {/* HALAMAN PUBLIK */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      
      {/* HALAMAN YANG MEMERLUKAN AUTHENTIKASI */}
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/umkm" element={<ProtectedRoute><UmkmPage /></ProtectedRoute>} />
      <Route path="/event" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/trend-market" element={<ProtectedRoute><TrendMarketPage /></ProtectedRoute>} />
      <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
      <Route path="/umkm/:id" element={<DetailUmkmPage />} />
      <Route path="/events/:id" element={<DetailEventPage />} />

      {/* HALAMAN ADMIN/CRUD (DIPROTEKSI) */}
      <Route path="/add-event" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
      <Route path="/edit-event/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
      <Route path="/add-umkm" element={<ProtectedRoute><AddUmkm /></ProtectedRoute>} />
      <Route path="/edit-umkm/:id" element={<ProtectedRoute><EditUmkm /></ProtectedRoute>} />
      <Route path="/manage-categories" element={<ProtectedRoute><CategoryManager /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
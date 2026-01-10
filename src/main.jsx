import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import AuthPage from './pages/Auth/auth.jsx';
import SignUpPage from './pages/sign-up/sign-up.jsx';
import Layout from './layout/layout-main.jsx';
import DataPeserta from './pages/role-admin/peserta/daftar.jsx';
import DashboardPeserta from './pages/role-admin/dashboard/dashboard.jsx';
import DetailPeserta from './pages/role-admin/peserta/detail-peserta.jsx';
import Navbar from './components/navbar.jsx';
import PesertaMain from './pages/role-peserta/peserta/peserta-main.jsx';
import FormPeserta from './pages/role-peserta/fom-pendaftaran/form-peserta.jsx';
import { ValidateOtpForm } from './pages/Auth/validate-otp-form.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/validate-otp/:phone" element={<ValidateOtpForm />} />

        {/* ADMIN ONLY */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<Layout />}>
            <Route path="/admin/dashboard" element={<DashboardPeserta />} />
            <Route path="/admin/daftar-peserta" element={<DataPeserta />} />
            <Route
              path="/admin/daftar-peserta/detail-peserta"
              element={<DetailPeserta />}
            />
          </Route>
        </Route>

        {/* PESERTA ONLY */}
        <Route element={<ProtectedRoute allowedRoles={["composer"]} />}>
          <Route element={<Navbar />}>
            <Route path="/participant/:id" element={<PesertaMain />} />
            <Route path="/participant/form/:idMusik" element={<FormPeserta />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>
);

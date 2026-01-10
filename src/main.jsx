import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // <-- pastikan ini ada
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AuthPage from './pages/Auth/auth.jsx';
import SignUpPage from './pages/sign-up/sign-up.jsx';
import Layout from './layout/layout-main.jsx';
import DataPeserta from './pages/role-admin/peserta/daftar.jsx';
import DashboardPeserta from './pages/role-admin/dashboard/dashboard.jsx';
import { Toaster } from 'sonner';
import DetailPeserta from './pages/role-admin/peserta/detail-peserta.jsx';
import Navbar from './components/navbar.jsx';
import PesertaMain from './pages/role-peserta/peserta/peserta-main.jsx';
import FormPeserta from './pages/role-peserta/fom-pendaftaran/form-peserta.jsx';
import { ValidateOtpForm } from './pages/Auth/validate-otp-form.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<Layout />}>
          <Route path="/admin/daftar-peserta" element={<DataPeserta />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/admin/daftar-peserta/detail-peserta/:id" element={<DetailPeserta />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/admin/dashboard" element={<DashboardPeserta />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/participant/:id" element={<PesertaMain />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/participant/form" element={<FormPeserta />} />
        </Route>
        <Route element={<Navbar />}>
          <Route path="/validate-otp/:phone" element={<ValidateOtpForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

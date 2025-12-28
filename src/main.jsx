import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // <-- pastikan ini ada
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AuthPage from './pages/Auth/auth.jsx';
import SignUpPage from './pages/sign-up/sign-up.jsx';
import Layout from './layout/layout-main.jsx';
import DataPeserta from './pages/role-admin/peserta/daftar.jsx';

const root = createRoot(document.getElementById('root')); // buat root dulu
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<Layout />}>
          <Route path="/peserta/daftar" element={<DataPeserta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

import { NextUIProvider } from '@nextui-org/react';
import "./index.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AboutPage } from "./pages/AboutPage";
import { Dashboard } from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { MainPage } from "./pages/MainPage";
import { SignUpPage } from './pages/SignUpPage';
import { SettingsPage } from './pages/SettingsPage';
import { PasswordUpdate } from './pages/PasswordUpdate';


export const Root = () => {
  return (
    <NextUIProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignUpPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="password_update" element={<PasswordUpdate />} />
            <Route path='dashboard' element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </NextUIProvider>
  );
};

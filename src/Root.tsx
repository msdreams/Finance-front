import { Route, HashRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HistoryPage } from "./pages/HistoryPage";
import { AboutPage } from "./pages/AboutPage";
import { PlanPage } from "./pages/PlanPage";
import { HomePage } from "./pages/HomePage";
import { MainPage } from "./pages/MainPage";
import { NewTargetPage } from "./pages/NewTargetPage";
import { NewBudgetPage } from "./pages/NewBudgetPage";
import ProtectedRoute from "./ProtectedRoute";

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LoginPage />} />
          
          <Route path="plan" element={
            <ProtectedRoute>
              <PlanPage />
            </ProtectedRoute>
          } />
          
          <Route path="history" element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          } />

          <Route path="home" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

          <Route path="about" element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          } />

          <Route path="main" element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          } />

          <Route path="new-target" element={
            <ProtectedRoute>
              <NewTargetPage />
            </ProtectedRoute>
          } />

          <Route path="new-budget" element={
            <ProtectedRoute>
              <NewBudgetPage />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
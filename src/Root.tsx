import { NextUIProvider } from '@nextui-org/react';
import "./index.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HistoryPage } from "./pages/HistoryPage";
import { AboutPage } from "./pages/AboutPage";
import { PlanPage } from "./pages/PlanPage";
import { HomePage } from "./pages/HomePage";
import { NewTargetPage } from "./pages/NewTargetPage";
import { NewBudgetPage } from "./pages/NewBudgetPage";
import { NameSettingsA } from "./components/NameSettingsA";
import ProtectedRoute from "./ProtectedRoute";
import { AddTransaction } from "./pages/AddTransactionPage";
import { NewAccountPage } from "./pages/NewAccountPage";
import { AllCategories } from "./pages/AllCategories";
import { NewIncomeCategoryPage } from "./pages/NewIncomeCategoryPage.tsx";
import { NewExpenseCategoryPage } from "./pages/NewExpenseCategoryPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";
import { MainPage } from "./pages/MainPage";
import { SignUpPage } from './pages/SignUpPage';


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
            <Route path='account' element={<ProtectedRoute />}>
              <Route index element={<HomePage />} />
              <Route path='plan' element={<PlanPage />} />
              <Route path='history' element={<HistoryPage />} />
              <Route path='new-target' element={<NewTargetPage />} />
              <Route path='new-account' element={<NewAccountPage />} />
              <Route path="new-budget" element={<NewBudgetPage />} />
              <Route path="new-income-category" element={<NewIncomeCategoryPage />} />
              <Route path="change-password-page" element={<ChangePasswordPage />} />
              <Route path="new-expense-category" element={<NewExpenseCategoryPage />} />
              <Route path="settings" element={<NameSettingsA />} />
              <Route path="add-transaction" element={<AddTransaction />} />
              <Route path="all-categories" element={<AllCategories />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </NextUIProvider>
  );
};

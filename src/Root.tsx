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
import { NameSettingsA } from "./components/NameSettingsA";
import ProtectedRoute from "./ProtectedRoute";
import { AddTransaction } from "./pages/AddTransactionPage";
import { NewAccountPage } from "./pages/NewAccountPage";
import { AllCategories } from "./pages/AllCategories";
import { NewIncomeCategoryPage } from "./pages/NewIncomeCategoryPage.tsx";
import { NewExpenseCategoryPage } from "./pages/NewExpenseCategoryPage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<LoginPage />} />

          <Route
            path="plan"
            element={
              <ProtectedRoute>
                <PlanPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="history"
            element={
              <ProtectedRoute>
                <HistoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route path="about" element={<AboutPage />} />

          <Route
            path="main"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="new-target"
            element={
              <ProtectedRoute>
                <NewTargetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="new-account"
            element={
              <ProtectedRoute>
                <NewAccountPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="new-budget"
            element={
              <ProtectedRoute>
                <NewBudgetPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="new-income-category"
            element={
              <ProtectedRoute>
                <NewIncomeCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="change-password-page"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="new-expense-category"
            element={
              <ProtectedRoute>
                <NewExpenseCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <NameSettingsA />
              </ProtectedRoute>
            }
          />

          <Route
            path="add-transaction"
            element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            }
          />

          <Route
            path="all-categories"
            element={
              <ProtectedRoute>
                <AllCategories />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

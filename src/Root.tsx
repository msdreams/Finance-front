import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { PlanPage } from './pages/PlanPage';
import { HomePage } from './pages/HomePage';
import { MainPage } from './pages/MainPage';
import { NewTargetPage } from './pages/NewTargetPage';
import { NewBudgetPage } from './pages/NewBudgetPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='plan' element={<PlanPage />} />
          <Route path='history' element={<HistoryPage />} />
          <Route path='home' element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='main' element={<MainPage />} />
          <Route path='new-target' element={<NewTargetPage />} />
          <Route path='new-budget' element={<NewBudgetPage/>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import App from './App';
import { LoginPage } from './pages/LoginPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='login' element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
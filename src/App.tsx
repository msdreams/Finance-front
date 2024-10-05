import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <div className="triangle-bg"></div>
        <div className="triangle-bg-up"></div>
        <Outlet />
      </div>

    </div>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;

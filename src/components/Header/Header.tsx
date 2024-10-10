import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <Link to='/' className="header__logo">
        <img src="./img/Logo(Nav).svg" alt="img" />
        <p className='header__logo--text'>MONETA</p>
      </Link>

      <nav className='header__nav'>
        <Link to='/plan'>Plan</Link>
        <Link to='/history'>History</Link>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/login' className='header__nav--login-or-name'>Login</Link>
      </nav>
    </header>
  )
}
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/Finance-front/img/Logo(Nav).svg" alt="img" />
        <p className='header__logo--text'>MONETA</p>
      </div>

      <nav className='header__nav'>
        <div>Budget</div>
        <div>History</div>
        <div>Report</div>
        <div>About</div>
        <div className='header__nav--login-or-name'>Login</div>
      </nav>
    </header>
  )
}
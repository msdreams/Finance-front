import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src="/Finance-front/img/Logo(Nav).svg" alt="img" />
        <p>MONETA</p>
      </div>

      <nav className='header__nav'>
        <div>Home</div>
        <div>About</div>
        <div>Features</div>
        <div>Contacts</div>
        <div>Login</div>
      </nav>
    </header>
  )
}
import Cookies from "js-cookie";

export const AboutPage = () => {
  const refreshToken = Cookies.get('refreshToken')

  return (
    <div>
      <h1>О нас</h1>
      <p>Здесь находится информация о нашей компании.</p>

      {refreshToken}
    </div>
  );
};

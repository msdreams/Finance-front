export const AboutText = () => {
  return (
    <div className="about__text">
      <p className="about__text-first">
        MONETA is a collaborative project developed by two developers: Denis and
        Adam.
      </p>

      <p className="about__text-o--d">
        Denis specializes in React, Redux Toolkit, Chart.js, and SCSS, bringing
        a robust front-end experience to the application.
      </p>

      <p className="about__text-o--a">
        Adam: Adam specializes in Java backend development with a strong command
        of the Hibernate and Spring frameworks. He has the technical expertise
        to deploy secure HTTPS servers on DigitalOcean, leveraging Docker for
        efficient containerization and managing both database and application
        droplets seamlessly. His skill set includes implementing robust user
        registration processes, whether through email or integrated Telegram
        bots, enhancing user experience across his applications. Adam's
        portfolio features both a financial tracking app and an online bookshop,
        demonstrating his adaptability and skill in creating data-driven,
        user-friendly applications across various domains.
      </p>

      <p className="about__text-main">
        MONETA serves as an expense tracking application that allows users to
        manage their finances effectively. Users can easily log their expenses,
        visualize their spending habits through interactive charts, and gain
        insights into their financial behavior. The app aims to empower users to
        take control of their budgeting and make informed financial decisions.
      </p>

      <p className="about__text-github">You can find the project on GitHub.</p>
      <a href="https://github.com/AdamMudrak/budgetapp">Back-end GitHub repo</a>
      <div></div>
      <a href="https://budgetapp.space/swagger-ui/index.html#/">Swagger API</a>
    </div>
  );
};

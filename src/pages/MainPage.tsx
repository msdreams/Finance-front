export const MainPage = () => {
  return (
    <>
      <h1>Personal Finance Dashboard</h1>
      <p>
        Gain Insights into Your Income and Expenses with Our Interactive Graph
      </p>

      <button>Add income</button>
      <button>Add expense</button>

      <div className="about">
        <h2>About</h2>
      </div>

      <div className="products">
        <h2>Products</h2>
      </div>

      <div className="contact">
        <h2>Contact</h2>
        <p>Get in Touch for Custom Financial Solutions</p>

        <div className="contact__block">
          <h3>Send Us a Message</h3>
          <p>We're Here to Help You Reach Your Financial Goals</p>

          <p>Our Team of Experts Provides Personalized Guidance to Optimize Your Finances</p>

          <button className="contact__button">Schedule a Consultation</button>
        </div>
      </div>

      <div className="partners">
        <h2>Partners</h2>
        <p>Trusted by Leading Brands</p>

        <div className="partners__block">
          <h3>Shell</h3>
          <p>Chevron</p>

          <p>We Proudly Collaborate with Industry Leaders to Provide Comprehensive Financial Services</p>

          <button className="partners__button">Learn More</button>
        </div>
      </div>

      <div className="legal">
        <h2>Legal</h2>
        <p>Explore Our Policies and Terms of Service</p>

        <div className="legal__block">
          <h3>Privacy Policy</h3>
          <p>Terms and Conditions</p>

          <p>Ensuring Transparency and Protecting Your Personal Information is Our Top Priority</p>

          <button className="legal__button">Read More</button>
        </div>
      </div>

      <p>Copyright © 2023 Personal Finance Dashboard</p>
      <button className="back-to-top">Back to Top</button>
    </>
  );
};

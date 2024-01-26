// Footer component for footer section
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      Created By
      <i className="fa-solid fa-heart"></i>
      <a
        href="https://www.linkedin.com/in/jayant-aggarwal-418910248/"
        target="_blank"
        title="LinkedIn"
      >
        Jayant Aggarwal
      </a>
      <i className="fa-solid fa-copyright"></i>
      {year}
      <strong>FoodVilla</strong>
    </div>
  );
};

export default Footer;

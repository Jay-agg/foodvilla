import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import food from "../Images/burger-image.png";

const About = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="about-container-main">
      <div className="about-profile-container">
        {/* used ternary condition to Show my profile and Hide my Profile and using nested routing */}
      </div>
      <div className="about-container">
        <div className="about-left">
          <h1>
            HI! <br /> WELLCOME TO FOODVILLA <br />
            <span>Tasty & Fresh Food</span>
          </h1>
        </div>
        <div className="about-right">
          <img src={food} alt="Food Image" />
        </div>
      </div>
    </div>
  );
};

export default About;

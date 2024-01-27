import { useState } from "react";
import Logo from "../../assets/img/foodvilla.png";
import { Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";
const Title = () => (
  <a href="/">
    <img className="logo" alt="logo" src={Logo} />
  </a>
);

const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">Cart({cartItems.length} items)</Link>
          </li>
          <li>
            {isLoggedin ? (
              <button
                className="logout-btn"
                onClick={() => setIsLoggedin(false)}
              >
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={() => setIsLoggedin(true)}>
                <Link to="/login">Login</Link>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

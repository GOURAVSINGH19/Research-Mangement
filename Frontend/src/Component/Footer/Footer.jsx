import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src="src/bpit.jpg" alt="" />
        <p>Get connected with us on social networks!</p>
        <div className="social-icons">
          <Link to="/">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="/">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="/">
            <i className="fab fa-google"></i>
          </Link>
          <Link to="/">
            <i className="fab fa-linkedin-in"></i>
          </Link>
          <Link to="/">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </div>
      <div className="footer-content">
        <div className="footer-column">
          <h6>BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY</h6>
          <p>
            Here you can use rows and columns to organize your footer content.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        {/* <div className="footer-column">
          <h6>PRODUCTS</h6>
          <ul>
            <li><Link to="/"></Link>MDBootstrap</Link></li>
            <li><Link to="/"></Link>MDWordPress</Link></li>
            <li><Link to="/"></Link>BrandFlow</Link></li>
            <li><Link to="/"></Link>Bootstrap Angular</Link></li>
          </ul>
        </div> */}
        <div className="footer-column">
          <h6>USEFUL LINKS</h6>
          <ul>
            <li>
              <Link to="/">Your Account</Link>
            </li>
            <li>
              <Link to="/">Become an Affiliate</Link>
            </li>
            <li>
              <Link to="/">Shipping Rates</Link>
            </li>
            <li>
              <Link to="/">Help</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h6>CONTACT</h6>
          <ul>
            <li>
              <i className="fas fa-home"></i> New York, NY 10012, US
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@example.com
            </li>
            <li>
              <i className="fas fa-phone"></i> + 01 234 567 88
            </li>
            <li>
              <i className="fas fa-print"></i> + 01 234 567 89
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2020 Copyright: BPIT.COM</p>
      </div>
    </footer>
  );
};

export default Footer;

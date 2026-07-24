import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Resume Builder", path: "/resume-builder" },
  { name: "Resume Analyzer", path: "/resume-analyzer" },
  { name: "Interview", path: "/interview" },
  { name: "About", path: "/about" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">

        <NavLink to="/" className="logo">
          <div className="logo-icon">
            <FaRobot />
          </div>

          <div className="logo-text">
            <h2>AI Career</h2>
            <span>Assistant</span>
          </div>
        </NavLink>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <button className="cta-btn">
          Get Started
        </button>

      </div>
    </header>
  );
}
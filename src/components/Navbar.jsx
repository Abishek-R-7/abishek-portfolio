import { Code, ArrowUpRight } from "lucide-react";

function Navbar() {
  return (
    <nav className="main-navbar">

      {/* Logo */}
      <a href="#home" className="navbar-brand">
        <Code size={25} />
        <h2>Abishek</h2>
      </a>

      {/* Navigation Links */}
      <div className="navbar-menu">
        <a href="#home" className="navbar-link">Home</a>
        <a href="#about" className="navbar-link">About</a>
        <a href="#skills" className="navbar-link">Skills</a>
        <a href="#projects" className="navbar-link">Projects</a>
        <a href="#blog" className="navbar-link">Blog</a>
        <a href="#contact" className="navbar-link">Contact</a>
      </div>

      {/* Hire Button */}
      <a href="#contact" className="navbar-hire">
        Hire Me <ArrowUpRight size={16} />
      </a>

    </nav>
  );
}

export default Navbar;


import { Mail, ArrowUp } from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer" id="top">

      <div className="footer-container">

        {/* Logo and Description */}

        <div className="footer-about">

          <h2>
            <span>&lt;/&gt;</span> ABISHEK
          </h2>

          <p>
            Passionate Full Stack Developer building
            modern and responsive web applications.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>

        </div>

        {/* Social Media */}

        <div className="footer-social">

          <h3>Follow Me</h3>

          <div className="social-icons">

            <a
              href="https://github.com/Abishek-R-7"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/abishek9400"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://instagram.com/abi_spartan._"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

          </div>

          <p>
            <Mail size={16} />
            abiee.pvt9400@gmail.com
          </p>

        </div>

      </div>

      {/* Copyright */}

      <div className="footer-bottom">

        <p>
          © 2026 Abishek R. All Rights Reserved.
        </p>

        <a href="#top">
          Back to Top <ArrowUp size={15} />
        </a>

      </div>

    </footer>
  );
}

export default Footer;

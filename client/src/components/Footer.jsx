import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-grid">

          <div>
            <h2>AI Career Assistant</h2>
            <p>
              Build professional resumes, analyze ATS compatibility,
              and prepare for interviews using Google Gemini AI.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>

            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/resume-builder">Resume Builder</a></li>
              <li><a href="/resume-analyzer">Resume Analyzer</a></li>
              <li><a href="/interview">Interview Preparation</a></li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>

            <div className="contact">
              <p><FaEnvelope /> your@email.com</p>
              <p><FaGithub /> GitHub</p>
              <p><FaLinkedin /> LinkedIn</p>
            </div>

          </div>

        </div>

        <hr />

        <p className="copyright">
          © 2026 AI Career Assistant. Built with React, Node.js & Gemini AI.
        </p>

      </div>
    </footer>
  );
}
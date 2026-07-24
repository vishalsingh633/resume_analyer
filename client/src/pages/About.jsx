import {
  FaReact,
  FaNodeJs,
  FaRobot,
  FaFilePdf,
} from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      {/* Header */}
      <header className="about-header">
        <h1>About AI Career Assistant</h1>
        <p className="about-intro">
          AI Career Assistant is a web application that helps students
          create professional resumes, analyze resume quality,
          and improve their chances of getting shortlisted by ATS
          (Applicant Tracking Systems).
        </p>
      </header>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <FaRobot className="icon-purple" size={36} />
          <h2>AI Resume Objective</h2>
          <p>
            Generate professional career objectives using
            Google Gemini AI.
          </p>
        </div>

        <div className="feature-card">
          <FaFilePdf className="icon-red" size={36} />
          <h2>Resume Export</h2>
          <p>
            Download your resume as a clean,
            professional PDF.
          </p>
        </div>

        <div className="feature-card">
          <FaReact className="icon-sky" size={36} />
          <h2>Modern Frontend</h2>
          <p>
            Built using React and CSS
            for a fast and responsive experience.
          </p>
        </div>

        <div className="feature-card">
          <FaNodeJs className="icon-green" size={36} />
          <h2>Node.js Backend</h2>
          <p>
            Uses Express.js and Gemini AI
            to generate intelligent responses.
          </p>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="about-section-card">
        <h2>Technologies Used</h2>
        <div className="tech-grid">
          <div className="tech-badge">React</div>
          <div className="tech-badge">CSS3</div>
          <div className="tech-badge">Node.js</div>
          <div className="tech-badge">Express.js</div>
          <div className="tech-badge">GROQ AI</div>
          <div className="tech-badge">playweight</div>
        </div>
      </div>

      {/* Developer Banner */}
      <div className="developer-card">
        <h2>Developer</h2>
        <p>
          Developed by Vishal Singh using
          React, Node.js, and GROQ AI
          to simplify resume creation and analysis.
        </p>
      </div>
    </div>
  );
}
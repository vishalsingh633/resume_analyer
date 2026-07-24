import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./Home.css";

export default function Hero() {
  const roles = [
    {
      role: "Frontend",
      question: "How do you optimize React apps?",
      tip: "Use lazy loading and code splitting.",
      score: 92,
    },
    {
      role: "Backend",
      question: "JWT vs Session?",
      tip: "Explain stateless authentication.",
      score: 88,
    },
    {
      role: "Data",
      question: "Explain SQL JOINs.",
      tip: "Use INNER JOIN examples.",
      score: 95,
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section className="hero">
      <div className="hero-container">

        <div className="hero-left">
          <span className="badge">🤖 AI Career Suite</span>

          <h1>
            Build Your Resume,
            <span> Crack Every Interview.</span>
          </h1>

          <p>
            Create ATS-friendly resumes, analyze resumes, and prepare for
            interviews with AI-powered guidance.
          </p>

          <div className="buttons">
            <Link to="/resume-builder" className="primary-btn">
              Build Resume <FaArrowRight />
            </Link>

            <Link to="/resume-analyzer" className="secondary-btn">
              Analyze Resume
            </Link>
          </div>
        </div>

        <div className="hero-card">

          <div className="tabs">
            {roles.map((item, index) => (
              <button
                key={index}
                className={active === index ? "active" : ""}
                onClick={() => setActive(index)}
              >
                {item.role}
              </button>
            ))}
          </div>

          <div className="content">
            <h3>Interview Question</h3>
            <p>{roles[active].question}</p>

            <h3>AI Tip</h3>
            <p>{roles[active].tip}</p>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${roles[active].score}%` }}
              ></div>
            </div>

            <span>{roles[active].score}% Ready</span>

            <Link to="/interview" className="link">
              Start Interview <FaArrowRight />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
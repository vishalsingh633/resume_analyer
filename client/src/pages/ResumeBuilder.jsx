import { useState } from "react";
import { FaMagic, FaDownload } from "react-icons/fa";
import TemplateSelector from "../components/TemplateSelector";
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import CreativeTemplate from "../templates/CreativeTemplate";

import { generateObjective } from "../api/resumeApi";
import { generatePDF } from "../utils/generatePDF";
import "./ResumeBuilder.css";

export default function ResumeBuilder() {
  const [template, setTemplate] = useState("modern");
  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    objective: "",

    // Education
    educationTitle: "",
    college: "",
    education: "",

    // Experience
    jobTitle: "",
    company: "",
    experienceDate: "",
    experience: "",

    skills: "",
    projects: "",

    // Additional sections
    certifications: "",
    languages: "",
    achievements: ""
  });

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerateObjective = async () => {
    try {
      setLoading(true);
      const res = await generateObjective(resume);
      setResume({
        ...resume,
        objective: res.data.objective
      });
    } catch (error) {
      alert("Unable to generate objective.");
    } finally {
      setLoading(false);
    }
  };

const handleDownload = () => {
  generatePDF(`${resume.fullName || "Resume"}.pdf`);
};

  return (
    <div className="rb-container dark-theme">
      {/* Header Section */}
      <header className="rb-header">
        <h1 className="rb-title">Resume Builder</h1>
        <p className="rb-subtitle">
          Craft a professional, ATS-friendly resume using AI power.
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className="rb-grid">
        {/* Left Form Section */}
        <div className="rb-card rb-form-card">
          <h2 className="rb-section-title">Resume Details</h2>

          <div className="rb-form-group">
            <span className="rb-label">Personal Information</span>
            <div className="rb-input-grid">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={resume.fullName}
                onChange={handleChange}
                className="rb-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={resume.email}
                onChange={handleChange}
                className="rb-input"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={resume.phone}
                onChange={handleChange}
                className="rb-input"
              />
              <input
                type="text"
                name="address"
                placeholder="City, Country"
                value={resume.address}
                onChange={handleChange}
                className="rb-input"
              />
            </div>
          </div>

          <div className="rb-form-group">
            <span className="rb-label">Online Profiles</span>
            <div className="rb-input-grid">
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn Profile URL"
                value={resume.linkedin}
                onChange={handleChange}
                className="rb-input"
              />
              <input
                type="text"
                name="github"
                placeholder="GitHub Profile URL"
                value={resume.github}
                onChange={handleChange}
                className="rb-input"
              />
            </div>
          </div>

          <div className="rb-form-group">
            <span className="rb-label">Education</span>
            <div className="rb-input-grid">
              <input
                type="text"
                name="educationTitle"
                placeholder="Degree (e.g. B.Tech in Computer Science)"
                value={resume.educationTitle}
                onChange={handleChange}
                className="rb-input"
              />
              <input
                type="text"
                name="college"
                placeholder="College / University Name"
                value={resume.college}
                onChange={handleChange}
                className="rb-input"
              />
            </div>
            <textarea
              rows="3"
              name="education"
              placeholder="Additional education details (e.g. CGPA, coursework, graduation year)"
              value={resume.education}
              onChange={handleChange}
              className="rb-textarea"
            />
          </div>

          <div className="rb-form-group">
            <span className="rb-label">Work Experience</span>
            <div className="rb-input-grid">
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title (e.g. Frontend Engineer)"
                value={resume.jobTitle}
                onChange={handleChange}
                className="rb-input"
              />
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={resume.company}
                onChange={handleChange}
                className="rb-input"
              />
              <input
                type="text"
                name="experienceDate"
                placeholder="Dates (e.g. Jun 2023 – Present)"
                value={resume.experienceDate}
                onChange={handleChange}
                className="rb-input"
              />
            </div>
            <textarea
              rows="4"
              name="experience"
              placeholder="One achievement or responsibility per line — each line becomes a bullet point"
              value={resume.experience}
              onChange={handleChange}
              className="rb-textarea"
            />
          </div>

          <div className="rb-form-group">
            <span className="rb-label">Skills & Projects</span>
            <textarea
              rows="3"
              name="skills"
              placeholder="Skills, comma separated (e.g. React, Node.js, Python, Figma)"
              value={resume.skills}
              onChange={handleChange}
              className="rb-textarea"
            />
            <textarea
              rows="4"
              name="projects"
              placeholder={"One project per line, format: Name: Description — Tech used\ne.g. Routewise: Route-planning app for delivery fleets — React, Mapbox"}
              value={resume.projects}
              onChange={handleChange}
              className="rb-textarea"
            />
          </div>

          <div className="rb-form-group">
            <span className="rb-label">Additional Sections</span>
            <textarea
              rows="2"
              name="certifications"
              placeholder="Certifications (optional)"
              value={resume.certifications}
              onChange={handleChange}
              className="rb-textarea"
            />
            <textarea
              rows="2"
              name="languages"
              placeholder="Languages (optional)"
              value={resume.languages}
              onChange={handleChange}
              className="rb-textarea"
            />
            <textarea
              rows="2"
              name="achievements"
              placeholder="Achievements / Awards (optional)"
              value={resume.achievements}
              onChange={handleChange}
              className="rb-textarea"
            />
          </div>

          <div className="rb-form-group">
            <span className="rb-label">AI Summary / Objective</span>
            <textarea
              rows="4"
              name="objective"
              placeholder="Career Objective"
              value={resume.objective}
              onChange={handleChange}
              className="rb-textarea"
            />
            <button
              onClick={handleGenerateObjective}
              disabled={loading}
              className="rb-btn rb-btn-ai"
            >
              <FaMagic />
              {loading ? "Generating Objective..." : "Generate AI Objective"}
            </button>
          </div>
        </div>

        {/* Right Preview Section */}
        <div className="rb-preview-column">
          <div className="rb-sticky-wrapper">
            <div className="rb-card rb-control-card">
              <h2 className="rb-section-title">Resume Template</h2>
              <TemplateSelector template={template} setTemplate={setTemplate} />
              <button onClick={handleDownload} className="rb-btn rb-btn-download">
                <FaDownload />
                Download PDF
              </button>
            </div>

            {/* Resume Live Preview Box (Kept light for true print preview) */}
            <div id="resume-preview" className="rb-card rb-preview-card">
              {template === "modern" && <ModernTemplate resume={resume} />}
              {template === "classic" && <ClassicTemplate resume={resume} />}
              {template === "creative" && <CreativeTemplate resume={resume} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
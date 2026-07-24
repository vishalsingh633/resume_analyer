import React from "react";

// Shown whenever a field is empty, so the preview always looks like a
// real resume instead of going blank while the user is still filling
// out the form. Each field switches to real input the moment the user
// types something into it.
const SAMPLE = {
   fullName: "Vishal singh",
  jobTitle: "Frontend Engineer",
  email: "vishal.sinhg@email.com",
  phone: "+91 98765 43210",
  address: "Jaipur, India",
  linkedin: "linkedin.com/in/vishal",
  github: "github.com/vishal",
  objective:
    "Frontend engineer with 3 years building performant, accessible web apps in React and TypeScript. Shipped design-system components used across 6 product teams.",
  company: "Nimbus Labs",
  experienceDate: "Jun 2023 – Present",
  experience:
    "Rebuilt the checkout flow in React and TypeScript, reducing cart abandonment 18%\nLed migration from CRA to Vite, cutting cold build times from 90s to 12s\nMentored 2 junior engineers on component testing standards",
  projects:
    "Routewise: Route-planning app for delivery fleets — React, Mapbox, Node\nFormik-lite: Lightweight form-validation library, 4kb gzipped — TypeScript",
  educationTitle: "B.Tech, Computer Science",
  college: "MNIT Jaipur",
  education: "",
  skills: "React, TypeScript, Next.js, Tailwind CSS, Node.js, GraphQL",
  certifications: "",
  languages: "",
  achievements: "",
};

export default function ModernTemplate({ resume }) {
  // A field falls back to sample content only when the user hasn't
  // typed anything into it yet — real input always wins.
  const field = (name) => (resume[name] && resume[name].trim() ? resume[name] : SAMPLE[name]);
  const isSample = !resume.fullName || !resume.fullName.trim();

  const skills = (field("skills") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const projects = (field("projects") || "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...rest] = line.split(":");
      return { name: name.trim(), detail: rest.join(":").trim() };
    });

  const experienceBullets = (field("experience") || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .modern-page {
          width: 210mm;
          min-height: 297mm;
          max-height: 297mm;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          font-family: 'Inter', -apple-system, sans-serif;
          color: #23262b;
          margin: 0 auto;
        }

        @media print {
          @page { size: A4; margin: 0; }
          body { background: #ffffff; padding: 0; }
          .modern-page {
            box-shadow: none;
            width: 210mm;
            min-height: 297mm;
            max-height: 297mm;
          }
        }

        .modern-header {
          background: #1d4ed8;
          color: #ffffff;
          padding: 16mm 20mm 12mm;
        }
        .modern-h1 {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 0.2px;
          margin: 0;
        }
        .modern-role-tag {
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #bfd2ff;
          margin-top: 4px;
        }
        .modern-contact-row {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 16px;
          margin-top: 12px;
          font-size: 10.5px;
          color: #dbe6ff;
        }

        .modern-body {
          padding: 12mm 20mm 16mm;
        }

        .modern-section { margin-bottom: 16px; }
        .modern-h2 {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #1d4ed8;
          margin-bottom: 8px;
          padding-bottom: 5px;
          border-bottom: 2px solid #e2e8f7;
        }

        .modern-body-text { font-size: 10.5px; line-height: 1.6; color: #333740; margin: 0; }

        .modern-entry { margin-bottom: 12px; }
        .modern-entry:last-child { margin-bottom: 0; }
        .modern-entry-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .modern-entry-title { font-weight: 700; font-size: 11.5px; color: #14213d; }
        .modern-entry-sub { font-size: 10px; color: #6b7280; font-weight: 500; }
        .modern-entry-date {
          font-size: 9.5px;
          color: #1d4ed8;
          font-weight: 600;
          white-space: nowrap;
          background: #eef2ff;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .modern-bullets { margin: 6px 0 0; padding-left: 16px; }
        .modern-bullets li { margin-bottom: 4px; font-size: 10.5px; line-height: 1.6; color: #333740; }
        .modern-bullets li::marker { color: #1d4ed8; }

        .modern-skills-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .modern-skill-pill {
          font-size: 9.5px;
          color: #1d4ed8;
          background: #eef2ff;
          padding: 3px 10px;
          border-radius: 3px;
          font-weight: 600;
        }

        .modern-project-name { font-weight: 700; color: #14213d; font-size: 11px; }
        .modern-project-stack { font-size: 9.5px; color: #6b7280; font-weight: 500; }

        .modern-sample-badge {
          position: absolute;
          top: 8mm;
          right: 8mm;
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #ffffff;
          background: rgba(255,255,255,0.18);
          padding: 3px 8px;
          border-radius: 3px;
        }
      `}</style>

      <div className="modern-page" style={{ position: "relative" }}>
        {isSample && <span className="modern-sample-badge">Sample preview</span>}

        {/* ================= Header ================= */}
        <div className="modern-header">
          <h1 className="modern-h1">{field("fullName")}</h1>
          {field("jobTitle") && <div className="modern-role-tag">{field("jobTitle")}</div>}
          <div className="modern-contact-row">
            {field("email") && <span>{field("email")}</span>}
            {field("phone") && <span>{field("phone")}</span>}
            {field("address") && <span>{field("address")}</span>}
            {field("linkedin") && <span>{field("linkedin")}</span>}
            {field("github") && <span>{field("github")}</span>}
          </div>
        </div>

        <div className="modern-body">

          {/* ================= Objective ================= */}
          {field("objective") && (
            <section className="modern-section">
              <h2 className="modern-h2">Career Objective</h2>
              <p className="modern-body-text">{field("objective")}</p>
            </section>
          )}

          {/* ================= Experience ================= */}
          {field("company") && (
            <section className="modern-section">
              <h2 className="modern-h2">Experience</h2>
              <div className="modern-entry">
                <div className="modern-entry-head">
                  <div>
                    <div className="modern-entry-title">
                      {field("jobTitle") ? `${field("jobTitle")} — ${field("company")}` : field("company")}
                    </div>
                  </div>
                  {field("experienceDate") && (
                    <span className="modern-entry-date">{field("experienceDate")}</span>
                  )}
                </div>
                {experienceBullets.length > 0 && (
                  <ul className="modern-bullets">
                    {experienceBullets.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}

          {/* ================= Projects ================= */}
          {projects.length > 0 && (
            <section className="modern-section">
              <h2 className="modern-h2">Projects</h2>
              {projects.map((proj, i) => (
                <div className="modern-entry" key={i}>
                  <div className="modern-project-name">
                    {proj.name}
                    {proj.detail && (
                      <span className="modern-project-stack"> — {proj.detail}</span>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* ================= Education ================= */}
          <section className="modern-section">
            <h2 className="modern-h2">Education</h2>
            <div className="modern-entry">
              <div className="modern-entry-head">
                <span className="modern-entry-title">{field("educationTitle")}</span>
                <span className="modern-entry-sub">{field("college")}</span>
              </div>
              {field("education") && (
                <p className="modern-body-text" style={{ marginTop: "4px" }}>
                  {field("education")}
                </p>
              )}
            </div>
          </section>

          {/* ================= Skills ================= */}
          <section className="modern-section">
            <h2 className="modern-h2">Skills</h2>
            {skills.length > 0 ? (
              <div className="modern-skills-row">
                {skills.map((skill, i) => (
                  <span className="modern-skill-pill" key={i}>{skill}</span>
                ))}
              </div>
            ) : (
              <p className="modern-body-text">Technical skills will appear here.</p>
            )}
          </section>

          {/* ================= Certifications ================= */}
          {field("certifications") && (
            <section className="modern-section">
              <h2 className="modern-h2">Certifications</h2>
              <p className="modern-body-text" style={{ whiteSpace: "pre-line" }}>
                {field("certifications")}
              </p>
            </section>
          )}

          {/* ================= Languages ================= */}
          {field("languages") && (
            <section className="modern-section">
              <h2 className="modern-h2">Languages</h2>
              <p className="modern-body-text" style={{ whiteSpace: "pre-line" }}>
                {field("languages")}
              </p>
            </section>
          )}

          {/* ================= Achievements ================= */}
          {field("achievements") && (
            <section className="modern-section">
              <h2 className="modern-h2">Achievements</h2>
              <p className="modern-body-text" style={{ whiteSpace: "pre-line" }}>
                {field("achievements")}
              </p>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
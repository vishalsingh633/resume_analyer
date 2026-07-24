import React from "react";

// Shown whenever a field is empty, so the preview always looks like a
// real resume instead of going blank while the user is still filling
// out the form.
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

export default function ClassicTemplate({ resume }) {
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
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');

        .resume-page {
          width: 210mm;
          min-height: 297mm;
          max-height: 297mm;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          padding: 18mm 20mm;
          color: #23262b;
          font-family: 'Inter', -apple-system, sans-serif;
          margin: 0 auto;
        }

        @media print {
          @page { size: A4; margin: 0; }
          body { background: #ffffff; padding: 0; }
          .resume-page {
            box-shadow: none;
            width: 210mm;
            min-height: 297mm;
            max-height: 297mm;
          }
        }

        .resume-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-bottom: 2.5px solid #1c2b4a;
          padding-bottom: 14px;
          margin-bottom: 20px;
        }
        .resume-h1 {
          font-family: 'Source Serif 4', serif;
          font-weight: 700;
          font-size: 27px;
          letter-spacing: 0.2px;
          color: #12203b;
          margin: 0;
        }
        .resume-role-tag {
          font-size: 11px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #6b7280;
          margin-top: 3px;
        }
        .resume-contact {
          text-align: right;
          font-size: 10.5px;
          color: #4b5563;
          line-height: 1.6;
        }
        .resume-contact span { display: block; }

        .resume-section { margin-bottom: 18px; }
        .resume-h2 {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: #1c2b4a;
          margin-bottom: 9px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .resume-h2::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #d7dae1;
        }

        .resume-body-text { font-size: 10.5px; line-height: 1.65; color: #2f333a; margin: 0; }
        .resume-profile-text { text-align: left; color: #3a3f47; }

        .resume-entry { margin-bottom: 13px; }
        .resume-entry:last-child { margin-bottom: 0; }
        .resume-entry-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .resume-entry-title { font-weight: 700; font-size: 11.5px; color: #12203b; }
        .resume-entry-sub { font-style: italic; font-size: 10px; color: #6b7280; }
        .resume-entry-date { font-size: 10px; color: #6b7280; white-space: nowrap; }

        .resume-bullets { margin: 6px 0 0; padding-left: 16px; }
        .resume-bullets li { margin-bottom: 4px; font-size: 10.5px; line-height: 1.65; color: #2f333a; }
        .resume-bullets li::marker { color: #1c2b4a; }

        .resume-skills-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .resume-skill-pill {
          font-size: 9.5px;
          color: #1c2b4a;
          background: #eef1f7;
          border: 1px solid #dde2ec;
          padding: 3px 10px;
          border-radius: 3px;
          font-weight: 500;
        }

        .resume-project-name { font-weight: 700; color: #12203b; }
        .resume-project-stack { font-size: 9.5px; color: #6b7280; font-style: italic; }

        .resume-sample-badge {
          position: absolute;
          top: 8mm;
          right: 8mm;
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #9ca3af;
          background: #f3f4f6;
          padding: 3px 8px;
          border-radius: 3px;
        }
      `}</style>

      <div className="resume-page" style={{ position: "relative" }}>
        {isSample && <span className="resume-sample-badge">Sample preview</span>}

        {/* ================= Header ================= */}
        <header className="resume-header">
          <div>
            <h1 className="resume-h1">{field("fullName")}</h1>
            {field("jobTitle") && <div className="resume-role-tag">{field("jobTitle")}</div>}
          </div>
          <div className="resume-contact">
            {field("email") && <span>{field("email")}</span>}
            {(field("phone") || field("address")) && (
              <span>{[field("phone"), field("address")].filter(Boolean).join(" · ")}</span>
            )}
            {(field("linkedin") || field("github")) && (
              <span>{[field("linkedin"), field("github")].filter(Boolean).join(" · ")}</span>
            )}
          </div>
        </header>

        {/* ================= Profile ================= */}
        {field("objective") && (
          <section className="resume-section">
            <h2 className="resume-h2">Profile</h2>
            <p className="resume-body-text resume-profile-text">{field("objective")}</p>
          </section>
        )}

        {/* ================= Experience ================= */}
        {field("company") && (
          <section className="resume-section">
            <h2 className="resume-h2">Experience</h2>
            <div className="resume-entry">
              <div className="resume-entry-head">
                <span className="resume-entry-title">
                  {field("jobTitle") ? `${field("jobTitle")} — ${field("company")}` : field("company")}
                </span>
                {field("experienceDate") && (
                  <span className="resume-entry-date">{field("experienceDate")}</span>
                )}
              </div>
              {experienceBullets.length > 0 && (
                <ul className="resume-bullets">
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
          <section className="resume-section">
            <h2 className="resume-h2">Projects</h2>
            {projects.map((proj, i) => (
              <div className="resume-entry" key={i}>
                <div className="resume-project-name">
                  {proj.name}
                  {proj.detail && (
                    <span className="resume-project-stack"> — {proj.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ================= Education ================= */}
        <section className="resume-section">
          <h2 className="resume-h2">Education</h2>
          <div className="resume-entry">
            <div className="resume-entry-head">
              <span className="resume-entry-title">{field("educationTitle")}</span>
              <span className="resume-entry-sub">{field("college")}</span>
            </div>
            {field("education") && (
              <p className="resume-body-text" style={{ marginTop: "4px" }}>
                {field("education")}
              </p>
            )}
          </div>
        </section>

        {/* ================= Skills ================= */}
        <section className="resume-section">
          <h2 className="resume-h2">Skills</h2>
          {skills.length > 0 ? (
            <div className="resume-skills-row">
              {skills.map((skill, i) => (
                <span className="resume-skill-pill" key={i}>{skill}</span>
              ))}
            </div>
          ) : (
            <p className="resume-body-text">Technical skills will appear here.</p>
          )}
        </section>

        {/* ================= Certifications ================= */}
        {field("certifications") && (
          <section className="resume-section">
            <h2 className="resume-h2">Certifications</h2>
            <p className="resume-body-text" style={{ whiteSpace: "pre-line" }}>
              {field("certifications")}
            </p>
          </section>
        )}

        {/* ================= Languages ================= */}
        {field("languages") && (
          <section className="resume-section">
            <h2 className="resume-h2">Languages</h2>
            <p className="resume-body-text" style={{ whiteSpace: "pre-line" }}>
              {field("languages")}
            </p>
          </section>
        )}

        {/* ================= Achievements ================= */}
        {field("achievements") && (
          <section className="resume-section">
            <h2 className="resume-h2">Achievements</h2>
            <p className="resume-body-text" style={{ whiteSpace: "pre-line" }}>
              {field("achievements")}
            </p>
          </section>
        )}

      </div>
    </>
  );
}
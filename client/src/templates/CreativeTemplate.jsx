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

export default function CreativeTemplate({ resume }) {
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

  const initial = field("fullName") ? field("fullName").trim().charAt(0).toUpperCase() : "?";

  return (
    <>
      <style>{`
        .creative-page {
          width: 210mm;
          min-height: 297mm;
          max-height: 297mm;
          overflow: hidden;
          display: flex;
          background: #ffffff;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          font-family: Arial, Helvetica, sans-serif;
          color: #23262b;
          font-size: 10.5px;
          margin: 0 auto;
          position: relative;
        }

        @media print {
          @page { size: A4; margin: 0; }
          body { background: #ffffff; padding: 0; }
          .creative-page {
            box-shadow: none;
            width: 210mm;
            min-height: 297mm;
            max-height: 297mm;
          }
        }

        .creative-sample-badge {
          position: absolute;
          top: 8mm;
          right: 8mm;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #183153;
          background: #ffffff;
          padding: 3px 8px;
          border-radius: 3px;
          z-index: 2;
        }

        /* ================= SIDEBAR ================= */
        .creative-sidebar {
          width: 34%;
          background: #183153;
          color: #ffffff;
          padding: 16mm 10mm;
        }
        .creative-profile { text-align: center; margin-bottom: 26px; }
        .creative-avatar {
          width: 84px;
          height: 84px;
          margin: 0 auto 14px;
          border-radius: 50%;
          background: #ffffff;
          color: #183153;
          font-size: 32px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .creative-name {
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 0.4px;
          line-height: 1.25;
        }
        .creative-role {
          margin-top: 6px;
          color: #cddcf6;
          font-size: 11px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }
        .creative-sidebar-title {
          margin-top: 24px;
          margin-bottom: 12px;
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-bottom: 2px solid rgba(255,255,255,0.3);
          padding-bottom: 6px;
        }
        .creative-contact-item {
          margin-bottom: 8px;
          font-size: 10.5px;
          word-break: break-word;
          line-height: 1.5;
          color: #e6edfb;
        }
        .creative-skills { display: flex; flex-wrap: wrap; gap: 6px; }
        .creative-skill {
          background: #ffffff;
          color: #183153;
          padding: 4px 10px;
          border-radius: 3px;
          font-size: 9.5px;
          font-weight: bold;
        }

        /* ================= MAIN ================= */
        .creative-main { width: 66%; padding: 16mm 14mm; }
        .creative-section { margin-bottom: 18px; }
        .creative-section:last-child { margin-bottom: 0; }
        .creative-section-title {
          font-size: 13px;
          color: #183153;
          font-weight: bold;
          border-left: 4px solid #183153;
          padding-left: 9px;
          margin-bottom: 10px;
        }
        .creative-content { color: #3a3f47; line-height: 1.6; margin: 0; }
        .creative-entry-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 4px 10px;
        }
        .creative-entry-title { font-weight: bold; font-size: 11.5px; color: #183153; }
        .creative-entry-sub { font-size: 10px; color: #6b7280; }
        .creative-entry-date { font-size: 9.5px; color: #183153; font-weight: bold; white-space: nowrap; }

        .creative-bullets { margin: 6px 0 0; padding-left: 16px; }
        .creative-bullets li { margin-bottom: 4px; color: #3a3f47; line-height: 1.6; }

        .creative-card {
          margin-top: 8px;
          padding: 10px 12px;
          background: #f7f9fc;
          border-left: 3px solid #183153;
          border-radius: 4px;
        }
        .creative-card:first-child { margin-top: 0; }
        .creative-project-name { font-weight: bold; color: #183153; }
        .creative-project-detail { color: #555; }
      `}</style>

      <div className="creative-page">
        {isSample && <span className="creative-sample-badge">Sample preview</span>}

        {/* ================= Sidebar ================= */}
        <div className="creative-sidebar">
          <div className="creative-profile">
            <div className="creative-avatar">{initial}</div>
            <div className="creative-name">{field("fullName")}</div>
            {field("jobTitle") && <div className="creative-role">{field("jobTitle")}</div>}
          </div>

          <div className="creative-sidebar-title">Contact</div>
          {field("email") && <div className="creative-contact-item">{field("email")}</div>}
          {field("phone") && <div className="creative-contact-item">{field("phone")}</div>}
          {field("address") && <div className="creative-contact-item">{field("address")}</div>}
          {field("linkedin") && <div className="creative-contact-item">{field("linkedin")}</div>}
          {field("github") && <div className="creative-contact-item">{field("github")}</div>}

          {skills.length > 0 && (
            <>
              <div className="creative-sidebar-title">Skills</div>
              <div className="creative-skills">
                {skills.map((skill, i) => (
                  <span className="creative-skill" key={i}>{skill}</span>
                ))}
              </div>
            </>
          )}

          {field("languages") && (
            <>
              <div className="creative-sidebar-title">Languages</div>
              <div className="creative-contact-item">{field("languages")}</div>
            </>
          )}
        </div>

        {/* ================= Main ================= */}
        <div className="creative-main">

          {field("objective") && (
            <section className="creative-section">
              <h2 className="creative-section-title">Career Objective</h2>
              <p className="creative-content">{field("objective")}</p>
            </section>
          )}

          {field("company") && (
            <section className="creative-section">
              <h2 className="creative-section-title">Experience</h2>
              <div className="creative-entry-head">
                <span className="creative-entry-title">
                  {field("jobTitle") ? `${field("jobTitle")} — ${field("company")}` : field("company")}
                </span>
                {field("experienceDate") && (
                  <span className="creative-entry-date">{field("experienceDate")}</span>
                )}
              </div>
              {experienceBullets.length > 0 && (
                <ul className="creative-bullets">
                  {experienceBullets.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {projects.length > 0 && (
            <section className="creative-section">
              <h2 className="creative-section-title">Projects</h2>
              {projects.map((proj, i) => (
                <div className="creative-card" key={i}>
                  <span className="creative-project-name">{proj.name}</span>
                  {proj.detail && (
                    <span className="creative-project-detail"> — {proj.detail}</span>
                  )}
                </div>
              ))}
            </section>
          )}

          <section className="creative-section">
            <h2 className="creative-section-title">Education</h2>
            <div className="creative-entry-head">
              <span className="creative-entry-title">{field("educationTitle")}</span>
              <span className="creative-entry-sub">{field("college")}</span>
            </div>
            {field("education") && (
              <p className="creative-content" style={{ marginTop: "4px" }}>
                {field("education")}
              </p>
            )}
          </section>

          {field("certifications") && (
            <section className="creative-section">
              <h2 className="creative-section-title">Certifications</h2>
              <p className="creative-content" style={{ whiteSpace: "pre-line" }}>
                {field("certifications")}
              </p>
            </section>
          )}

          {field("achievements") && (
            <section className="creative-section">
              <h2 className="creative-section-title">Achievements</h2>
              <p className="creative-content" style={{ whiteSpace: "pre-line" }}>
                {field("achievements")}
              </p>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
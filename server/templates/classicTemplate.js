const escapeHtml = (text = "") =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const lines = (text = "") =>
  String(text)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const SAMPLE = {
  fullName: "Vishal Singh",
  jobTitle: "Frontend Engineer",
  email: "vishal.singh@email.com",
  phone: "+91 98765 43210",
  address: "Jaipur, India",
  linkedin: "linkedin.com/in/vishalsingh",
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
  education: "CGPA: 8.8/10 • Graduated with Honors",
  skills: "React, TypeScript, Next.js, Tailwind CSS, Node.js, GraphQL",
  certifications: "AWS Certified Developer – Associate\nMeta Front-End Developer Professional Certificate",
  languages: "English (Professional) • Hindi (Native)",
  achievements: "Winner of National Hackathon 2023 (1st place out of 150+ teams)\nPublished article on React performance optimization with 25k+ views",
};

export const classicTemplate = (resume = {}) => {
  // Helper to fallback to SAMPLE data if field is missing or whitespace
  const field = (name) =>
    resume[name] && String(resume[name]).trim() ? resume[name] : SAMPLE[name];

  const isSample = !resume.fullName || !String(resume.fullName).trim();

  // Skills
  const skillList = (field("skills") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const skillsHtml = skillList.length
    ? `<div class="resume-skills-row">
        ${skillList.map((s) => `<span class="resume-skill-pill">${escapeHtml(s)}</span>`).join("")}
       </div>`
    : `<p class="resume-body-text">Technical skills will appear here.</p>`;

  // Experience Bullets
  const experienceBullets = lines(field("experience"));
  const experienceHtml = experienceBullets.length
    ? `<ul class="resume-bullets">
        ${experienceBullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}
       </ul>`
    : "";

  // Projects
  const projects = lines(field("projects")).map((line) => {
    const [name, ...rest] = line.split(":");
    return { name: name.trim(), detail: rest.join(":").trim() };
  });

  const projectsHtml = projects.length
    ? projects
        .map(
          (p) => `
        <div class="resume-entry">
          <div class="resume-project-name">
            ${escapeHtml(p.name)}
            ${p.detail ? `<span class="resume-project-stack"> — ${escapeHtml(p.detail)}</span>` : ""}
          </div>
        </div>`
        )
        .join("")
    : "";

  // Render multi-line texts (like Certifications/Achievements) as styled bullets or clean blocks
  const renderListOrText = (rawText) => {
    const parsedLines = lines(rawText);
    if (parsedLines.length > 1) {
      return `<ul class="resume-bullets">
        ${parsedLines.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}
      </ul>`;
    }
    return `<p class="resume-body-text">${escapeHtml(rawText)}</p>`;
  };

  // Contact details formatting
  const line1 = [field("phone"), field("address")].filter(Boolean).map(escapeHtml).join(" · ");
  const line2 = [field("linkedin"), field("github")].filter(Boolean).map(escapeHtml).join(" · ");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(field("fullName"))}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @page {
    size: A4;
    margin: 0;
  }

  body {
    background: #ffffff;
    font-family: 'Inter', -apple-system, sans-serif;
    color: #23262b;
    -webkit-print-color-adjust: exact;
  }

  .resume-page {
    position: relative;
    width: 210mm;
    min-height: 297mm;
    max-height: 297mm;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    padding: 16mm 18mm 18mm;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media print {
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
    padding-bottom: 12px;
    margin-bottom: 16px;
  }
  .resume-h1 {
    font-family: 'Source Serif 4', serif;
    font-weight: 700;
    font-size: 26px;
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
    font-weight: 600;
  }
  .resume-contact {
    text-align: right;
    font-size: 10.5px;
    color: #4b5563;
    line-height: 1.55;
  }
  .resume-contact span { display: block; }

  .resume-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }

  .resume-section {
    margin-bottom: 14px;
  }
  .resume-section:last-child {
    margin-bottom: 0;
  }

  .resume-h2 {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: #1c2b4a;
    margin-bottom: 8px;
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

  .resume-body-text { font-size: 10.5px; line-height: 1.6; color: #2f333a; margin: 0; }
  .resume-profile-text { text-align: left; color: #3a3f47; }

  .resume-entry { margin-bottom: 10px; }
  .resume-entry:last-child { margin-bottom: 0; }
  .resume-entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .resume-entry-title { font-weight: 700; font-size: 11px; color: #12203b; }
  .resume-entry-sub { font-style: italic; font-size: 10px; color: #6b7280; }
  .resume-entry-date { font-size: 10px; color: #6b7280; white-space: nowrap; }

  .resume-bullets { margin: 4px 0 0; padding-left: 16px; }
  .resume-bullets li { margin-bottom: 3px; font-size: 10.5px; line-height: 1.55; color: #2f333a; }
  .resume-bullets li::marker { color: #1c2b4a; }

  .resume-skills-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 2px; }
  .resume-skill-pill {
    font-size: 9.5px;
    color: #1c2b4a;
    background: #eef1f7;
    border: 1px solid #dde2ec;
    padding: 3px 9px;
    border-radius: 3px;
    font-weight: 500;
  }

  .resume-project-name { font-weight: 700; font-size: 10.5px; color: #12203b; }
  .resume-project-stack { font-size: 9.5px; color: #6b7280; font-style: italic; font-weight: normal; }

  .resume-sample-badge {
    position: absolute;
    top: 6mm;
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
</style>
</head>
<body>
<div class="resume-page">
  ${isSample ? '<span class="resume-sample-badge">Sample preview</span>' : ""}

  <!-- ================= Header ================= -->
  <header class="resume-header">
    <div>
      <h1 class="resume-h1">${escapeHtml(field("fullName"))}</h1>
      ${field("jobTitle") ? `<div class="resume-role-tag">${escapeHtml(field("jobTitle"))}</div>` : ""}
    </div>
    <div class="resume-contact">
      ${field("email") ? `<span>${escapeHtml(field("email"))}</span>` : ""}
      ${line1 ? `<span>${line1}</span>` : ""}
      ${line2 ? `<span>${line2}</span>` : ""}
    </div>
  </header>

  <div class="resume-main">
    <!-- ================= Profile ================= -->
    ${
      field("objective")
        ? `<section class="resume-section">
            <h2 class="resume-h2">Profile</h2>
            <p class="resume-body-text resume-profile-text">${escapeHtml(field("objective"))}</p>
          </section>`
        : ""
    }

    <!-- ================= Experience ================= -->
    ${
      field("company")
        ? `<section class="resume-section">
            <h2 class="resume-h2">Experience</h2>
            <div class="resume-entry">
              <div class="resume-entry-head">
                <span class="resume-entry-title">
                  ${
                    field("jobTitle")
                      ? `${escapeHtml(field("jobTitle"))} — ${escapeHtml(field("company"))}`
                      : escapeHtml(field("company"))
                  }
                </span>
                ${
                  field("experienceDate")
                    ? `<span class="resume-entry-date">${escapeHtml(field("experienceDate"))}</span>`
                    : ""
                }
              </div>
              ${experienceHtml}
            </div>
          </section>`
        : ""
    }

    <!-- ================= Projects ================= -->
    ${
      projectsHtml
        ? `<section class="resume-section">
            <h2 class="resume-h2">Projects</h2>
            ${projectsHtml}
          </section>`
        : ""
    }

    <!-- ================= Education ================= -->
    <section class="resume-section">
      <h2 class="resume-h2">Education</h2>
      <div class="resume-entry">
        <div class="resume-entry-head">
          <span class="resume-entry-title">${escapeHtml(field("educationTitle"))}</span>
          <span class="resume-entry-sub">${escapeHtml(field("college"))}</span>
        </div>
        ${
          field("education")
            ? `<p class="resume-body-text" style="margin-top: 3px;">${escapeHtml(field("education"))}</p>`
            : ""
        }
      </div>
    </section>

    <!-- ================= Skills ================= -->
    <section class="resume-section">
      <h2 class="resume-h2">Skills</h2>
      ${skillsHtml}
    </section>

    <!-- ================= Certifications ================= -->
    ${
      field("certifications")
        ? `<section class="resume-section">
            <h2 class="resume-h2">Certifications</h2>
            ${renderListOrText(field("certifications"))}
          </section>`
        : ""
    }

    <!-- ================= Achievements ================= -->
    ${
      field("achievements")
        ? `<section class="resume-section">
            <h2 class="resume-h2">Achievements</h2>
            ${renderListOrText(field("achievements"))}
          </section>`
        : ""
    }

    <!-- ================= Languages ================= -->
    ${
      field("languages")
        ? `<section class="resume-section">
            <h2 class="resume-h2">Languages</h2>
            <p class="resume-body-text">${escapeHtml(field("languages"))}</p>
          </section>`
        : ""
    }
  </div>
</div>
</body>
</html>
`;
};
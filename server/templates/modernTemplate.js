const escapeHtml = (text = "") =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Splits on newlines and drops empty lines — used for experience bullets
// and project entries.
const lines = (text = "") =>
  String(text)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const modernTemplate = (resume) => {
  const skillList = resume.skills
    ? resume.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const skillsHtml = skillList.length
    ? skillList.map((skill) => `<span class="skill">${escapeHtml(skill)}</span>`).join("")
    : "";

  const experienceHtml = lines(resume.experience)
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  const projectsHtml = lines(resume.projects)
    .map((line) => {
      const [name, ...rest] = line.split(":");
      const detail = rest.join(":").trim();
      return `
        <div class="project">
          <span class="project-name">${escapeHtml(name.trim())}</span>${
        detail ? `<span class="project-detail"> — ${escapeHtml(detail)}</span>` : ""
      }
        </div>`;
    })
    .join("");

  const contactParts = [
    resume.email,
    resume.phone,
    resume.address,
    resume.linkedin,
    resume.github,
  ]
    .filter(Boolean)
    .map((v) => escapeHtml(v));

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${escapeHtml(resume.fullName || "Resume")}</title>
<style>
  @page {
    size: A4;
    margin: 0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: "Segoe UI", Arial, sans-serif;
    color: #23262b;
    font-size: 10.5px;
    line-height: 1.6;
    background: #ffffff;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
  }

  /* ================= HEADER ================= */
  .header {
    background: #1d4ed8;
    color: #ffffff;
    padding: 16mm 20mm 12mm;
  }

  .name {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  .role {
    margin-top: 4px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: #bfd2ff;
  }

  .contact {
    margin-top: 12px;
    font-size: 10.5px;
    color: #dbe6ff;
  }
  /* Plain separated text, not icons/pills — keeps the string
     ATS-parseable as a single clean line. */
  .contact span:not(:last-child)::after {
    content: "  |  ";
    color: #93a9e6;
  }

  /* ================= BODY ================= */
  .body {
    padding: 12mm 20mm 16mm;
  }

  .section {
    margin-bottom: 16px;
  }
  .section:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #1d4ed8;
    padding-bottom: 5px;
    margin-bottom: 8px;
    border-bottom: 2px solid #e2e8f7;
  }

  .content {
    color: #333740;
    white-space: pre-line;
  }

  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 12px;
  }

  .entry-title {
    font-weight: 700;
    font-size: 11.5px;
    color: #14213d;
  }

  .entry-sub {
    font-size: 10px;
    color: #6b7280;
    font-weight: 500;
  }

  .entry-date {
    font-size: 9.5px;
    color: #1d4ed8;
    font-weight: 600;
    white-space: nowrap;
  }

  ul.bullets {
    margin: 6px 0 0;
    padding-left: 16px;
  }
  ul.bullets li {
    margin-bottom: 4px;
    color: #333740;
  }

  .project {
    margin-bottom: 8px;
  }
  .project:last-child {
    margin-bottom: 0;
  }
  .project-name {
    font-weight: 700;
    color: #14213d;
  }
  .project-detail {
    color: #4b5563;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .skill {
    background: #eef2ff;
    color: #1d4ed8;
    padding: 3px 10px;
    border-radius: 3px;
    font-size: 9.5px;
    font-weight: 600;
  }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="name">${escapeHtml(resume.fullName || "Your Name")}</div>
    ${resume.jobTitle ? `<div class="role">${escapeHtml(resume.jobTitle)}</div>` : ""}
    ${
      contactParts.length
        ? `<div class="contact">${contactParts.map((c) => `<span>${c}</span>`).join("")}</div>`
        : ""
    }
  </div>

  <div class="body">

    ${
      resume.objective
        ? `
    <div class="section">
      <div class="section-title">Career Objective</div>
      <div class="content">${escapeHtml(resume.objective)}</div>
    </div>`
        : ""
    }

    ${
      resume.company
        ? `
    <div class="section">
      <div class="section-title">Experience</div>
      <div class="entry-head">
        <span class="entry-title">${
          resume.jobTitle
            ? `${escapeHtml(resume.jobTitle)} — ${escapeHtml(resume.company)}`
            : escapeHtml(resume.company)
        }</span>
        ${resume.experienceDate ? `<span class="entry-date">${escapeHtml(resume.experienceDate)}</span>` : ""}
      </div>
      ${experienceHtml ? `<ul class="bullets">${experienceHtml}</ul>` : ""}
    </div>`
        : ""
    }

    ${
      projectsHtml
        ? `
    <div class="section">
      <div class="section-title">Projects</div>
      ${projectsHtml}
    </div>`
        : ""
    }

    <div class="section">
      <div class="section-title">Education</div>
      <div class="entry-head">
        <span class="entry-title">${escapeHtml(resume.educationTitle || "Education")}</span>
        ${resume.college ? `<span class="entry-sub">${escapeHtml(resume.college)}</span>` : ""}
      </div>
      ${resume.education ? `<div class="content" style="margin-top:4px">${escapeHtml(resume.education)}</div>` : ""}
    </div>

    ${
      skillsHtml
        ? `
    <div class="section">
      <div class="section-title">Technical Skills</div>
      <div class="skills">${skillsHtml}</div>
    </div>`
        : ""
    }

    ${
      resume.certifications
        ? `
    <div class="section">
      <div class="section-title">Certifications</div>
      <div class="content">${escapeHtml(resume.certifications)}</div>
    </div>`
        : ""
    }

    ${
      resume.languages
        ? `
    <div class="section">
      <div class="section-title">Languages</div>
      <div class="content">${escapeHtml(resume.languages)}</div>
    </div>`
        : ""
    }

    ${
      resume.achievements
        ? `
    <div class="section">
      <div class="section-title">Achievements</div>
      <div class="content">${escapeHtml(resume.achievements)}</div>
    </div>`
        : ""
    }

  </div>
</div>
</body>
</html>
`;
};
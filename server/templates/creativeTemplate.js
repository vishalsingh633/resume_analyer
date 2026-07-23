const escapeHtml = (text = "") =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// NOTE ON ATS COMPATIBILITY
// This template uses a two-column sidebar layout, which is the least
// ATS-safe of the three templates. Most modern parsers (Workday,
// Greenhouse, Lever) handle it fine, but older/stricter systems that
// read text left-to-right across the full page width can occasionally
// interleave sidebar content (contact info, skills) with main-column
// text. Keep contact info and skills — not job-critical experience or
// education — in the sidebar, as this file already does, and prefer
// modernTemplate/classicTemplate for applications you know will be
// auto-screened.

const lines = (text = "") =>
  String(text)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const creativeTemplate = (resume) => {
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
        <div class="card">
          <span class="project-name">${escapeHtml(name.trim())}</span>${
        detail ? `<span class="project-detail"> — ${escapeHtml(detail)}</span>` : ""
      }
        </div>`;
    })
    .join("");

  const initial = resume.fullName ? escapeHtml(resume.fullName.trim().charAt(0).toUpperCase()) : "?";

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
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10.5px;
    color: #23262b;
  }

  .resume {
    width: 210mm;
    min-height: 297mm;
    display: flex;
    background: #ffffff;
  }

  /* ================= SIDEBAR ================= */
  .sidebar {
    width: 34%;
    background: #183153;
    color: #ffffff;
    padding: 16mm 10mm;
  }

  .profile {
    text-align: center;
    margin-bottom: 26px;
  }

  .avatar {
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

  .name {
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.4px;
    line-height: 1.25;
  }

  .role {
    margin-top: 6px;
    color: #cddcf6;
    font-size: 11px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }

  .sidebar-title {
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 6px;
  }

  .contact-item {
    margin-bottom: 8px;
    font-size: 10.5px;
    word-break: break-word;
    line-height: 1.5;
    color: #e6edfb;
  }

  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .skill {
    background: #ffffff;
    color: #183153;
    padding: 4px 10px;
    border-radius: 3px;
    font-size: 9.5px;
    font-weight: bold;
  }

  /* ================= MAIN ================= */
  .main {
    width: 66%;
    padding: 16mm 14mm;
  }

  .section {
    margin-bottom: 18px;
  }
  .section:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 13px;
    color: #183153;
    font-weight: bold;
    border-left: 4px solid #183153;
    padding-left: 9px;
    margin-bottom: 10px;
  }

  .content {
    white-space: pre-line;
    color: #3a3f47;
    line-height: 1.6;
  }

  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 4px 10px;
  }
  .entry-title {
    font-weight: bold;
    font-size: 11.5px;
    color: #183153;
  }
  .entry-sub {
    font-size: 10px;
    color: #6b7280;
  }
  .entry-date {
    font-size: 9.5px;
    color: #183153;
    font-weight: bold;
    white-space: nowrap;
  }

  ul.bullets {
    margin: 6px 0 0;
    padding-left: 16px;
  }
  ul.bullets li {
    margin-bottom: 4px;
    color: #3a3f47;
  }

  .card {
    margin-top: 8px;
    padding: 10px 12px;
    background: #f7f9fc;
    border-left: 3px solid #183153;
    border-radius: 4px;
  }
  .card:first-child {
    margin-top: 0;
  }
  .project-name {
    font-weight: bold;
    color: #183153;
  }
  .project-detail {
    color: #555;
  }
</style>
</head>
<body>
<div class="resume">

  <div class="sidebar">
    <div class="profile">
      <div class="avatar">${initial}</div>
      <div class="name">${escapeHtml(resume.fullName || "Your Name")}</div>
      ${resume.jobTitle ? `<div class="role">${escapeHtml(resume.jobTitle)}</div>` : ""}
    </div>

    <div class="sidebar-title">Contact</div>
    ${resume.email ? `<div class="contact-item">${escapeHtml(resume.email)}</div>` : ""}
    ${resume.phone ? `<div class="contact-item">${escapeHtml(resume.phone)}</div>` : ""}
    ${resume.address ? `<div class="contact-item">${escapeHtml(resume.address)}</div>` : ""}
    ${resume.linkedin ? `<div class="contact-item">${escapeHtml(resume.linkedin)}</div>` : ""}
    ${resume.github ? `<div class="contact-item">${escapeHtml(resume.github)}</div>` : ""}

    ${
      skillsHtml
        ? `
    <div class="sidebar-title">Skills</div>
    <div class="skills">${skillsHtml}</div>`
        : ""
    }

    ${
      resume.languages
        ? `
    <div class="sidebar-title">Languages</div>
    <div class="contact-item">${escapeHtml(resume.languages)}</div>`
        : ""
    }
  </div>

  <div class="main">

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
      resume.certifications
        ? `
    <div class="section">
      <div class="section-title">Certifications</div>
      <div class="content">${escapeHtml(resume.certifications)}</div>
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
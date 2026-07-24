import { useState } from "react";
import axios from "axios";
import "./ResumeAnalyzer.css";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // File Upload Handlers
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please choose a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://resume-analyer-cwmr.onrender.com/api/analyzer/analyze",
        formData
      );
      setResult(res.data);
    } catch (error) {
      alert("Unable to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-container">
      <header className="analyzer-header">
        <h1>Resume Analyzer</h1>
        <p className="analyzer-subtitle">
          Upload your resume and receive AI-powered feedback.
        </p>
      </header>

      {/* Upload Box */}
      <div className="upload-card">
        <label
          htmlFor="file-upload"
          className={`file-dropzone ${dragActive ? "drag-active" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <span className="upload-icon">📄</span>
          
          {!file ? (
            <>
              <p className="dropzone-text">
                Drag and drop your PDF resume here, or click to browse
              </p>
              <p className="dropzone-hint">Supports PDF files up to 10MB</p>
            </>
          ) : (
            <div className="file-preview">
              <span>{file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
              <button 
                type="button" 
                onClick={removeFile} 
                className="remove-file-btn" 
                title="Remove file"
              >
                ✕
              </button>
            </div>
          )}
        </label>

        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden-input"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading || !file}
          className="analyze-btn"
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Analyzing Resume...</span>
            </>
          ) : (
            "Analyze Resume"
          )}
        </button>
      </div>

      {/* Analysis Results Display */}
      {result && (
        <div className="results-container">
          {/* Metrics Section */}
          <div className="scores-grid">
            <div className="score-card">
              <h3>Resume Score</h3>
              <span className="score-value resume">{result.resumeScore}%</span>
            </div>

            <div className="score-card">
              <h3>ATS Compatibility</h3>
              <span className="score-value ats">{result.atsScore}%</span>
            </div>

            <div className="score-card">
              <h3>Grammar & Quality</h3>
              <span className="score-value grammar">{result.grammarScore}%</span>
            </div>
          </div>

          {/* Strengths Section */}
          <div className="detail-card">
            <h2>
              <span style={{ color: "var(--accent-green)" }}>✓</span> Strengths
            </h2>
            <ul className="styled-list strengths">
              {result.strengths?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Missing Skills Section */}
          <div className="detail-card">
            <h2>
              <span style={{ color: "var(--accent-red)" }}>⚠️</span> Missing Skills
            </h2>
            <ul className="skills-badge-container">
              {result.missingSkills?.map((item, index) => (
                <li key={index} className="skill-tag">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions Section */}
          <div className="detail-card">
            <h2>
              <span>💡</span> Suggestions for Improvement
            </h2>
            <ul className="styled-list suggestions">
              {result.suggestions?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
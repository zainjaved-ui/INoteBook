import React from "react";
import "./About.css"; 

export default function About() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 p-4 about-card">
        <h2 className="text-center text-primary mb-3">About iNotebook</h2>
        <p className="lead text-muted text-center">
          A secure and personal notes manager built with the <strong>MERN</strong> stack.
        </p>
        <hr />
        <div className="mt-3">
          <h5>📌 What is iNotebook?</h5>
          <p>
            <strong>iNotebook</strong> is a web application where each user can
            create, edit, and delete personal notes. Notes are private and only
            accessible by the user who created them.
          </p>

          <h5>⚙️ Tech Stack</h5>
          <ul>
            <li><strong>Frontend:</strong> React.js</li>
            <li><strong>Backend:</strong> Express.js</li>
            <li><strong>Database:</strong> MongoDB</li>
          </ul>

          <h5>🔒 Security</h5>
          <p>
            Each user must log in to access their notes. Notes are stored
            securely in the database, and only the owner can view or modify
            them.
          </p>

          <h5>✨ Features</h5>
          <ul>
            <li>User authentication (login & signup)</li>
            <li>Create, update, and delete notes</li>
            <li>Secure storage with MongoDB</li>
            <li>Beautiful and responsive UI</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

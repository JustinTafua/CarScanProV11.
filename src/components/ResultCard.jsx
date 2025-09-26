import React from "react";

export default function ResultCard({ title, description, image }) {
  return (
    <div className="result-card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <style jsx>{`
        .result-card {
          border: 1px solid #ddd;
          padding: 16px;
          margin: 12px 0;
          border-radius: 8px;
          background: #fff;
        }
        img {
          max-width: 100%;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}

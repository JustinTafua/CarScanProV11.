import React from "react";

export default function Onboarding({ onFinish }) {
  return (
    <div className="onboarding">
      <h2>Welcome to CarScan Pro 🚗🔍</h2>
      <p>Use your phone to scan parts, get instant results, and save money on repairs.</p>
      <button onClick={onFinish}>Get Started</button>
      <style jsx>{`
        .onboarding {
          text-align: center;
          padding: 20px;
        }
        button {
          margin-top: 15px;
          padding: 10px 20px;
          background: #0d47a1;
          color: #fff;
          border: none;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

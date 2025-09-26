import React from "react";
import Link from "next/link";

export default function Paywall({ message }) {
  return (
    <div className="paywall">
      <p>{message || "You’ve hit the free limit."}</p>
      <Link href="/pricing">
        <button className="upgrade-btn">Upgrade to Pro</button>
      </Link>
      <style jsx>{`
        .paywall {
          text-align: center;
          padding: 20px;
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        .upgrade-btn {
          margin-top: 10px;
          background: #0d47a1;
          color: #fff;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

// src/components/InstallPrompt.jsx
import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null);
  const [show, setShow] = useState(false);
  const isiOS =
    typeof navigator !== "undefined" &&
    /iphone|ipad|ipod/i.test(navigator.userAgent);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferred(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isiOS) {
    return (
      <button style={btn} onClick={() => alert("On iPhone:  Share → Add to Home Screen")}>
        Install
      </button>
    );
  }

  if (!deferred && !show) return null;
  return (
    <button
      style={btn}
      onClick={async () => {
        if (!deferred) return;
        deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
        setShow(false);
      }}
    >
      Install
    </button>
  );
}

const btn = {
  padding: "8px 12px",
  fontWeight: 700,
  borderRadius: 10,
  background: "#335CFF",
  color: "#fff",
  border: "none",
};
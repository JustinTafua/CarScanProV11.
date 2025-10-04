import { useEffect, useRef, useState } from "react";

export default function Scan() {
  const videoRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState(null);
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);

  async function enumerateCameras() {
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      const cams = all.filter(d => d.kind === "videoinput");
      setDevices(cams);
      if (!deviceId && cams[0]) setDeviceId(cams[0].deviceId);
    } catch (e) {
      setError("Could not list cameras. Permissions may be required.");
    }
  }

  async function startCamera(chosenId) {
    setError("");
    try {
      // stop previous
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
      const constraints = chosenId
        ? { video: { deviceId: { exact: chosenId } } }
        : { video: { facingMode: { ideal: "environment" } } }; // default to rear
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setRunning(true);
    } catch (e) {
      setError(
        e?.message ||
          "Camera error. Make sure you allowed permissions and are on HTTPS."
      );
      setRunning(false);
    }
  }

  function stopCamera() {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
    }
    setRunning(false);
  }

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera not supported on this device/browser.");
      return;
    }
    enumerateCameras();
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Flip camera logic
  function flipCamera() {
    if (!devices.length) return;
    const idx = devices.findIndex(d => d.deviceId === deviceId);
    const next = devices[(idx + 1) % devices.length];
    setDeviceId(next.deviceId);
    startCamera(next.deviceId);
  }

  return (
    <div style={{ padding: 16 }}>
      <h1>CarScan Camera</h1>
      <p>Point at a part, bolt, or tool. Tap Start to enable the camera.</p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <button onClick={() => startCamera(deviceId)} disabled={running}>
          {running ? "Running…" : "Start Camera"}
        </button>
        <button onClick={flipCamera} disabled={!devices.length}>
          Flip Camera
        </button>
        <button onClick={stopCamera} disabled={!running}>
          Stop
        </button>
        <select
          value={deviceId || ""}
          onChange={e => setDeviceId(e.target.value)}
          style={{ minWidth: 200 }}
        >
          {devices.map((d, i) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || `Camera ${i + 1}`}
            </option>
          ))}
        </select>
      </div>

      <video
        ref={videoRef}
        playsInline
        muted
        style={{
          width: "100%",
          maxWidth: 480,
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(0,0,0,0.4)"
        }}
      />

      {error && (
        <p style={{ color: "#ffb4b4", marginTop: 10 }}>
          <strong>Camera error:</strong> {error}
        </p>
      )}

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Tip: On iPhone Safari, ensure Settings → Safari → Camera is allowed.
      </p>
    </div>
  );
}

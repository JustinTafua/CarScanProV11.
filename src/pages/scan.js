import { useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Scan() {
  const videoRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        const model = await mobilenet.load();
        setInterval(async () => {
          const predictions = await model.classify(videoRef.current);
          if (predictions && predictions.length > 0) {
            resultRef.current.innerText =
              predictions[0].className +
              " (" +
              Math.round(predictions[0].probability * 100) +
              "%)";
          }
        }, 2000);
      } catch (err) {
        resultRef.current.innerText = "⚠️ Error accessing camera: " + err.message;
      }
    }
    setup();
  }, []);

  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", padding: "1rem" }}>
        <h1>CarScan Camera</h1>
        <video
          ref={videoRef}
          width="300"
          autoPlay
          muted
          playsInline
          style={{ border: "1px solid black" }}
        />
        <p ref={resultRef}>Scanning...</p>
      </main>
      <Footer />
    </div>
  );
}

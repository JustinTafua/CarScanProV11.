import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Feedback() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
        <h1>Feedback</h1>
        <p>We’d love to hear your thoughts about CarScan Pro.</p>
        <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="text" placeholder="Your name" />
          <textarea placeholder="Your feedback" rows="5"></textarea>
          <button type="submit">Submit</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '24px 12px',
      fontSize: '0.9rem',
      color: '#333',
      borderTop: '1px solid #eee',
      marginTop: 24
    }}>
      © {new Date().getFullYear()} CarScan Pro — Created by Justin Tafua
    </footer>
  );
}

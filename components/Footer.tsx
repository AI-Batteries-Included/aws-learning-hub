export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content-centered">
          <div className="footer-main">
            <h3>AWS Learning Hub</h3>
            <p>Demystifying AWS through the art of baking.</p>
          </div>
          <div className="footer-nav">
            <h4>Navigate</h4>
            <ul className="footer-nav-horizontal">
              <li><a href="#hero">Home</a></li>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#stage-1">Stage 1</a></li>
              <li><a href="#stage-2">Stage 2</a></li>
              <li><a href="#stage-3">Stage 3</a></li>
              <li><a href="#stage-4">Stage 4</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 AWS Learning Hub. Educational content for learning purposes.</p>
        </div>
      </div>
    </footer>
  );
}
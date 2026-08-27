import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Website Information */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <span>🎓</span>
            StudySpot
          </Link>

          <p>
            Helping students discover comfortable,
            peaceful and productive places to study
            around campus.
          </p>

        </div>


        {/* Explore Links */}
        <div className="footer-column">

          <h3>Explore</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/study-spots">
            Study Spots
          </Link>

          <Link to="/favorites">
            Favorites
          </Link>

          <Link to="/about">
            About Us
          </Link>

        </div>


        {/* Community Links */}
        <div className="footer-column">

          <h3>Community</h3>

          <Link to="/add-spot">
            Add a Study Spot
          </Link>

          <Link to="/my-reviews">
            My Reviews
          </Link>

          <Link to="/study-spots">
            Share Your Experience
          </Link>

        </div>


        {/* Contact */}
        <div className="footer-column">

          <h3>Stay Connected</h3>

          <p className="footer-contact">
            📧 24bt04192@gsfcuniversity.ac.in
          </p>

          <p className="footer-contact">
            📍 GSFC University
          </p>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          © 2026 StudySpot. Made with ❤️ for students.
        </p>

        <div className="footer-bottom-links">
          <span>Privacy</span>
          <span>Terms</span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
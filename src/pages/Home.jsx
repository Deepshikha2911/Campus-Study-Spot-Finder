import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    if (searchTerm.trim()) {
      navigate("/study-spots", {
        state: {
          searchTerm: searchTerm.trim(),
        },
      });
    }
  }

  return (
    <main className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-welcome">

            <span>
              Your campus study companion
            </span>

          </div>


          <h1>
            Study better.
            <br />

            <span>
              Find your space.
            </span>
          </h1>


          <p className="home-hero-text">

            Whether you need silence for deep focus,
            strong Wi-Fi for assignments, or a comfortable
            corner to relax and study — StudySpot helps
            you find the right place.

          </p>


          {/* SEARCH */}

          <form
            className="home-search"
            onSubmit={handleSearch}
          >

            <div className="home-search-icon">
              🔎
            </div>

            <input
              type="text"
              placeholder="What kind of place are you looking for?"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <button type="submit">
              Find a Place
            </button>

          </form>


          <p className="search-helper">
            Try searching: library, quiet, Wi-Fi, café, classroom
          </p>


          {/* HERO ACTIONS */}

          <div className="home-hero-actions">

            <Link
              to="/add-spot"
              className="home-main-action"
            >
              <span>＋</span>
              Share a Study Spot
            </Link>


            <Link
              to="/my-reviews"
              className="home-secondary-action"
            >
              My Reviews
            </Link>

          </div>

        </div>


        {/* RIGHT SIDE VISUAL */}

        <div className="home-hero-visual">

          <div className="study-desk-card">

            <div className="desk-top">

              <span className="desk-label">
                TODAY'S STUDY MODE
              </span>

              <span className="online-dot"></span>

            </div>


            <div className="desk-main">

              <div className="desk-emoji">
                💻
              </div>

              <div>

                <h3>
                  Ready to focus?
                </h3>

                <p>
                  Find a space that matches your mood.
                </p>

              </div>

            </div>


            <div className="study-progress">

              <div className="progress-info">

                <span>
                  Study comfort
                </span>

                <strong>
                  92%
                </strong>

              </div>

              <div className="progress-bar">

                <div className="progress-fill"></div>

              </div>

            </div>

          </div>


          <div className="floating-mini-card quiet-card">

            <span>
              🤫
            </span>

            <div>
              <strong>Quiet</strong>
              <small>Deep focus</small>
            </div>

          </div>


          <div className="floating-mini-card wifi-card">

            <span>
              📶
            </span>

            <div>
              <strong>Strong Wi-Fi</strong>
              <small>Stay connected</small>
            </div>

          </div>

        </div>

      </section>



      {/* =========================
          STUDY MOOD SECTION
      ========================= */}

      <section className="study-mood-section">

        <div className="mood-heading">

          <div>

            <p className="home-section-label">
              CHOOSE YOUR MOOD
            </p>

            <h2>
              What does your perfect
              <span> study session </span>
              feel like?
            </h2>

          </div>

          <p>
            Everyone studies differently.
            Start with what matters most to you.
          </p>

        </div>


        <div className="mood-grid">

          <Link
            to="/study-spots"
            state={{ searchTerm: "Quiet" }}
            className="mood-card"
          >

            <div className="mood-icon">
              🤫
            </div>

            <h3>
              Deep Focus
            </h3>

            <p>
              Quiet spaces for uninterrupted study.
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/study-spots"
            state={{ searchTerm: "WiFi" }}
            className="mood-card"
          >

            <div className="mood-icon">
              💻
            </div>

            <h3>
              Work Online
            </h3>

            <p>
              Reliable Wi-Fi for projects and research.
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/study-spots"
            state={{ searchTerm: "cafe" }}
            className="mood-card"
          >

            <div className="mood-icon">
              ☕
            </div>

            <h3>
              Relax & Study
            </h3>

            <p>
              Comfortable places for a casual session.
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/study-spots"
            state={{ searchTerm: "classroom" }}
            className="mood-card"
          >

            <div className="mood-icon">
              👥
            </div>

            <h3>
              Study Together
            </h3>

            <p>
              Spaces that work well for group study.
            </p>

            <span>
              Explore →
            </span>

          </Link>

        </div>

      </section>



      {/* =========================
          FEATURED SECTION
      ========================= */}

      <section className="featured-section">

        <div className="featured-content">

          <p className="home-section-label">
            DISCOVER SOMETHING NEW
          </p>

          <h2>
            Your next favorite
            <span> study corner </span>
            could be waiting.
          </h2>

          <p>
            Students can discover, review and share
            study-friendly places around campus.
          </p>


          <div className="featured-actions">

            <Link
              to="/favorites"
              className="featured-primary-btn"
            >
              ❤️ View My Favorites
            </Link>

            <Link
              to="/add-spot"
              className="featured-text-btn"
            >
              Suggest a new place →
            </Link>

          </div>

        </div>


        <div className="featured-preview">

          <div className="preview-top">

            <span className="preview-tag">
              STUDENT PICK
            </span>

          </div>


          <div className="preview-place-icon">
            🏛️
          </div>

          <h3>
            Find hidden study gems
          </h3>

          <p>
            Discover places recommended by students
            from your campus community.
          </p>


          <div className="preview-footer">

            <div className="preview-avatars">
              <span>👩‍🎓</span>
              <span>👨‍🎓</span>
              <span>👩‍💻</span>
            </div>

            <span>
              Shared by students
            </span>

          </div>

        </div>

      </section>



      {/* =========================
          COMMUNITY SECTION
      ========================= */}

      <section className="home-community">

        <div className="community-card">

          <div className="community-icon">
            🌱
          </div>

          <div>

            <h2>
              Built by student,
              for better study experiences.
            </h2>

            <p>
              Add places you love, share your experience
              and help other students discover better
              spaces around campus.
            </p>

          </div>


          <Link
            to="/add-spot"
            className="community-btn"
          >
            Contribute a Place →
          </Link>

        </div>

      </section>



      {/* =========================
          STATS
      ========================= */}

      <section className="home-stats">

        <div className="home-stat">

          <strong>25+</strong>

          <span>
            Study spaces
          </span>

        </div>


        <div className="home-stat">

          <strong>120+</strong>

          <span>
            Student reviews
          </span>

        </div>


        <div className="home-stat">

          <strong>4.8 ★</strong>

          <span>
            Average rating
          </span>

        </div>


        <div className="home-stat">

          <strong>500+</strong>

          <span>
            Students helped
          </span>

        </div>

      </section>

    </main>
  );
}

export default Home;
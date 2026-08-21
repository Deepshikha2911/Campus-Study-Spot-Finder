import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    navigate("/study-spots", {
      state: { searchTerm },
    });
  }

  return (
    <main>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            Made for students, by student
          </div>

          <h1>
            Find Your Perfect
            <span> Study Spot</span>
          </h1>

          <p>
            Discover quiet, comfortable and student-friendly
            places to study around your campus.
          </p>

          {/* Search */}
          <form className="search-box" onSubmit={handleSearch}>
            <span>🔍</span>

            <input
              type="text"
              placeholder="Search library, cafe, classroom..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          {/* Hero Buttons */}
          <div className="hero-buttons">
            <Link to="/study-spots" className="primary-btn">
              Explore Study Spots →
            </Link>

            <Link to="/study-spots" className="secondary-btn">
              📍 Find Near Me
            </Link>
          </div>

        </div>

      </section>


      {/* Features Section */}
      <section className="features-section">

        <div className="section-heading">
          <p className="small-heading">WHY STUDYSPOT?</p>

          <h2>
            Everything you need to find
            <span> your ideal study place.</span>
          </h2>

          <p>
            Compare study environments based on what matters
            most to you.
          </p>
        </div>


        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🤫</div>
            <h3>Noise Level</h3>
            <p>
              Find peaceful places perfect for focused studying.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📶</div>
            <h3>Wi-Fi Quality</h3>
            <p>
              Check Wi-Fi quality before choosing your spot.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔌</div>
            <h3>Power Outlets</h3>
            <p>
              Know where you can charge your laptop and phone.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Crowd Level</h3>
            <p>
              Choose between quiet corners and social spaces.
            </p>
          </div>

        </div>

      </section>


      {/* Statistics Section */}
      <section className="stats-section">

        <div className="stat">
          <h2>25+</h2>
          <p>Study Spots</p>
        </div>

        <div className="stat">
          <h2>120+</h2>
          <p>Student Reviews</p>
        </div>

        <div className="stat">
          <h2>4.8 ⭐</h2>
          <p>Average Rating</p>
        </div>

        <div className="stat">
          <h2>500+</h2>
          <p>Students</p>
        </div>

      </section>

    </main>
  );
}

export default Home;
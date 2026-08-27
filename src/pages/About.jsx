import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">

      {/* Decorative Background Elements */}
      <div className="about-shape shape-one"></div>
      <div className="about-shape shape-two"></div>
      <div className="about-shape shape-three"></div>


      {/* ================= HERO SECTION ================= */}

      <section className="about-hero">

        <div className="about-badge">
          Discover • Study • Grow
        </div>

        <h1>
          Find Your Perfect
          <span> Study Space.</span>
        </h1>

        <p>
          StudySpot helps students discover comfortable,
          peaceful and productive places to study around campus.
        </p>


        {/* Floating Icons */}

        <div className="floating-icon floating-book">
          📚
        </div>

        <div className="floating-icon floating-coffee">
          ☕
        </div>

        <div className="floating-icon floating-laptop">
          💻
        </div>

        <div className="floating-icon floating-star">
          ⭐
        </div>

      </section>



      {/* ================= MISSION SECTION ================= */}

      <section className="about-mission-section">

        <div className="about-mission-content">

          <div className="mission-text">

            <p className="section-tag">
              OUR MISSION
            </p>

            <h2>
              Studying should be comfortable,
              productive and enjoyable.
            </h2>

            <p>
              Finding the right place to study can make a huge
              difference. StudySpot helps students discover spaces
              based on important factors such as noise levels,
              Wi-Fi quality, power outlets and crowd levels.
            </p>

            <p>
              Whether you prefer a quiet corner for deep focus or
              a lively environment for group study, StudySpot helps
              you find a place that matches your preferences.
            </p>

          </div>


          <div className="mission-visual">

            <div className="mission-circle">

              <div className="mission-emoji">
                🎓
              </div>

            </div>


            <div className="mission-small-card card-one">
              🤫 Quiet Spaces
            </div>

            <div className="mission-small-card card-two">
              📶 Great Wi-Fi
            </div>

            <div className="mission-small-card card-three">
              🔌 Power Outlets
            </div>

          </div>

        </div>

      </section>



      {/* ================= FEATURES SECTION ================= */}

      <section className="about-features">

        <div className="about-section-heading">

          <p className="section-tag">
            WHY STUDYSPOT?
          </p>

          <h2>
            Everything You Need to
            Find Your Study Space
          </h2>

          <p>
            Explore, compare and discover the best places
            for your study sessions.
          </p>

        </div>


        <div className="about-feature-grid">


          <div className="about-feature-card feature-purple">

            <div className="feature-icon">
              📍
            </div>

            <h3>
              Discover Places
            </h3>

            <p>
              Explore different study-friendly places
              around your campus.
            </p>

          </div>


          <div className="about-feature-card feature-blue">

            <div className="feature-icon">
              📶
            </div>

            <h3>
              Find What You Need
            </h3>

            <p>
              Search for places with great Wi-Fi,
              power outlets and more.
            </p>

          </div>


          <div className="about-feature-card feature-pink">

            <div className="feature-icon">
              ⭐
            </div>

            <h3>
              Student Reviews
            </h3>

            <p>
              Read experiences and reviews shared
              by other students.
            </p>

          </div>


          <div className="about-feature-card feature-orange">

            <div className="feature-icon">
              ❤️
            </div>

            <h3>
              Save Favorites
            </h3>

            <p>
              Save your favorite study spots and
              easily access them anytime.
            </p>

          </div>

        </div>

      </section>



      {/* ================= HOW IT WORKS ================= */}

      <section className="how-it-works-section">

        <div className="about-section-heading">

          <p className="section-tag">
            HOW IT WORKS
          </p>

          <h2>
            Find Your Perfect Spot
            in Three Simple Steps
          </h2>

        </div>


        <div className="steps-container">


          <div className="step-card">

            <div className="step-number">
              1
            </div>

            <div className="step-icon">
              🔎
            </div>

            <h3>
              Explore
            </h3>

            <p>
              Browse available study spots around campus.
            </p>

          </div>


          <div className="step-connector">
            →
          </div>


          <div className="step-card">

            <div className="step-number">
              2
            </div>

            <div className="step-icon">
              🎯
            </div>

            <h3>
              Compare
            </h3>

            <p>
              Check noise, Wi-Fi, outlets and crowd levels.
            </p>

          </div>


          <div className="step-connector">
            →
          </div>


          <div className="step-card">

            <div className="step-number">
              3
            </div>

            <div className="step-icon">
              📚
            </div>

            <h3>
              Study
            </h3>

            <p>
              Choose your perfect space and focus on learning.
            </p>

          </div>

        </div>

      </section>



      {/* ================= COMMUNITY SECTION ================= */}

      <section className="about-community">

        <div className="community-content">

          <div className="community-emoji-group">
            👩‍🎓 👨‍🎓
          </div>

          <h2>
            Built for Students,<br></br>
            <span> By A Student.</span>
          </h2>

          <p>
            StudySpot is more than just a place finder.
            It is a growing student community where everyone
            can share useful study spaces and help others
            discover better places to learn.
          </p>

        </div>

      </section>



      {/* ================= FINAL CTA ================= */}

      <section className="about-final-cta">

        <div className="cta-glow"></div>

        <div className="cta-content">

          <p>
            YOUR NEXT FAVORITE STUDY SPACE IS WAITING!
          </p>

          <h2>
            Ready to find your
            perfect study spot?
          </h2>

          <Link
            to="/study-spots"
            className="cta-main-btn"
          >
            Start Exploring →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;
import { Link } from "react-router-dom";
import StudySpotCard from "../components/StudySpotCard";

function Favorites({ favorites }) {
  return (
    <main className="favorites-page">

      {/* Page Heading */}
      <section className="favorites-hero">

        <p className="small-heading">
          YOUR COLLECTION
        </p>

        <h1>
          Your Favorite
          <span> Study Spots</span>
        </h1>

        <p>
          Keep all your favorite places in one place
          and quickly find your perfect study environment.
        </p>

      </section>


      {/* Favorites Content */}
      <section className="favorites-container">

        {favorites.length > 0 ? (

          <>
            <div className="favorites-info">

              <div>
                <h2>Saved Places</h2>

                <p>
                  {favorites.length} saved study spot
                  {favorites.length > 1 ? "s" : ""}
                </p>
              </div>

            </div>


            <div className="study-spots-grid">

              {favorites.map((spot) => (
                <StudySpotCard
                  key={spot.id}
                  spot={spot}
                />
              ))}

            </div>

          </>

        ) : (

          <div className="empty-favorites">

            <div className="empty-heart">
              ♡
            </div>

            <h2>No saved study spots yet</h2>

            <p>
              Explore campus study spaces and save the ones
              you love for quick access later.
            </p>

            <Link
              to="/study-spots"
              className="explore-spots-btn"
            >
              Explore Study Spots →
            </Link>

          </div>

        )}

      </section>

    </main>
  );
}

export default Favorites;
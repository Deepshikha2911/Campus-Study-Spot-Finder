import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import StudySpotCard from "../components/StudySpotCard";

function StudySpots({ studySpots }) {

  const location = useLocation();


  // Stores what the user types in the search bar
  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm ?? ""
  );


  // Stores the selected filter
  const [activeFilter, setActiveFilter] = useState("All");

  // Stores the selected sorting option
  const [sortBy, setSortBy] = useState("default");

  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setSortOpen(false);
      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // Filter study spots
  const filteredSpots = studySpots.filter((spot) => {

    // Search functionality
    const matchesSearch =
      spot.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      spot.location
        .toLowerCase()
        .includes(searchTerm.toLowerCase());


    // Filter functionality
    let matchesFilter = true;


    if (activeFilter === "Quiet") {

      matchesFilter =
        spot.noise === "Quiet";

    }

    else if (activeFilter === "WiFi") {

      matchesFilter =
        spot.wifi === "Excellent";

    }

    else if (activeFilter === "Outlets") {

      matchesFilter =
        spot.outlets === "Many";

    }

    else if (activeFilter === "Less Crowded") {

      matchesFilter =
        spot.crowd === "Low";

    }


    return matchesSearch && matchesFilter;

  });

  const sortedSpots = [...filteredSpots].sort((a, b) => {

    if (sortBy === "rating") {

      return (b.rating || 0) - (a.rating || 0);

    }

    if (sortBy === "reviews") {

      return (b.reviews || 0) - (a.reviews || 0);

    }

    if (sortBy === "name") {

      return a.name.localeCompare(b.name);

    }

    return 0;

  });


  return (

    <main className="study-spots-page">


      {/* Page Heading */}

      <section className="spots-hero">

        <p className="small-heading">
          EXPLORE CAMPUS
        </p>


        <h1>
          Find Your Perfect
          <span> Study Space.</span>
        </h1>


        <p>
          Discover study-friendly places based on noise,
          Wi-Fi, power outlets and crowd levels.
        </p>


        {/* Search Box */}

        <div className="spots-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search for a study spot..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>

      </section>


      {/* Filter Buttons */}

      <section className="filter-section">


        <button
          className={`filter ${activeFilter === "All"
            ? "active"
            : ""
            }`}
          onClick={() =>
            setActiveFilter("All")
          }
        >
          ✨ All Spots
        </button>


        <button
          className={`filter ${activeFilter === "Quiet"
            ? "active"
            : ""
            }`}
          onClick={() =>
            setActiveFilter("Quiet")
          }
        >
          🤫 Quiet
        </button>


        <button
          className={`filter ${activeFilter === "WiFi"
            ? "active"
            : ""
            }`}
          onClick={() =>
            setActiveFilter("WiFi")
          }
        >
          📶 Great Wi-Fi
        </button>


        <button
          className={`filter ${activeFilter === "Outlets"
            ? "active"
            : ""
            }`}
          onClick={() =>
            setActiveFilter("Outlets")
          }
        >
          🔌 Outlets
        </button>


        <button
          className={`filter ${activeFilter === "Less Crowded"
            ? "active"
            : ""
            }`}
          onClick={() =>
            setActiveFilter(
              "Less Crowded"
            )
          }
        >
          👥 Less Crowded
        </button>

      </section>


      {/* Study Spot Cards */}

      <section className="spots-container">


        <div className="spots-info">

          {/* LEFT SIDE */}

          <div className="spots-info-title">

            <h2>
              Popular Study Spots
            </h2>

            <p>
              {filteredSpots.length} places available
            </p>

          </div>


          {/* RIGHT SIDE */}

          <div className="spots-info-actions">

            {activeFilter !== "All" && (

              <p className="active-filter-text">

                Showing {activeFilter} spots

              </p>

            )}

            <div
              className="custom-sort"
              ref={sortRef}
            >

              <button
                type="button"
                className={`custom-sort-button ${sortOpen ? "sort-open" : ""
                  }`}
                onClick={() =>
                  setSortOpen(!sortOpen)
                }
              >

                <span className="sort-button-content">

                  <span className="sort-icon">
                    ↕
                  </span>

                  <span>

                    {sortBy === "default" &&
                      "Sort By"}

                    {sortBy === "rating" &&
                      "Highest Rated"}

                    {sortBy === "reviews" &&
                      "Most Reviewed"}

                    {sortBy === "name" &&
                      "Name A–Z"}

                  </span>

                </span>

                <span className="sort-arrow">
                  {sortOpen ? "⌃" : "⌄"}
                </span>

              </button>


              {sortOpen && (

                <div className="custom-sort-menu">

                  <button
                    type="button"
                    className={
                      sortBy === "default"
                        ? "sort-option selected"
                        : "sort-option"
                    }
                    onClick={() => {

                      setSortBy("default");
                      setSortOpen(false);

                    }}
                  >
                    ↕ Sort By
                  </button>


                  <button
                    type="button"
                    className={
                      sortBy === "rating"
                        ? "sort-option selected"
                        : "sort-option"
                    }
                    onClick={() => {

                      setSortBy("rating");
                      setSortOpen(false);

                    }}
                  >
                    ⭐ Highest Rated
                  </button>


                  <button
                    type="button"
                    className={
                      sortBy === "reviews"
                        ? "sort-option selected"
                        : "sort-option"
                    }
                    onClick={() => {

                      setSortBy("reviews");
                      setSortOpen(false);

                    }}
                  >
                    💬 Most Reviewed
                  </button>


                  <button
                    type="button"
                    className={
                      sortBy === "name"
                        ? "sort-option selected"
                        : "sort-option"
                    }
                    onClick={() => {

                      setSortBy("name");
                      setSortOpen(false);

                    }}
                  >
                    🔤 Name A–Z
                  </button>

                </div>

              )}

            </div>


            <Link
              to="/add-spot"
              className="add-spot-page-btn"
            >

              <span>＋</span>

              Add a Study Spot

            </Link>

          </div>

        </div>


        {/* Cards */}

        <div className="study-spots-grid">


          {sortedSpots.length > 0 ? (

            sortedSpots.map((spot) => (

              <StudySpotCard
                key={spot.id}
                spot={spot}
              />

            ))

          ) : (

            <div className="no-results">

              <div>
                🔍
              </div>

              <h2>
                No study spots found
              </h2>

              <p>
                Try searching for something else or
                change your filter.
              </p>

              <button
                onClick={() => {

                  setSearchTerm("");

                  setActiveFilter("All");

                }}
              >
                Clear Search
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default StudySpots;
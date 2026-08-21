import { Link, useParams } from "react-router-dom";
import studySpots from "../data/studySpots";

function SpotDetails({
    favorites,
    toggleFavorite,
    reviews
}) {
    // Get the ID from the URL
    const { id } = useParams();

    // Find the matching study spot
    const spot = studySpots.find(
        (spot) => spot.id === Number(id)
    );

    const isFavorite = favorites.some(
        (favorite) => favorite.id === spot.id
    );

    const spotReviews = reviews.filter(
        (review) => review.spotId === spot.id
    );

    // If no study spot is found
    if (!spot) {
        return (
            <main className="page-container">
                <h1>Study Spot Not Found 😕</h1>

                <Link to="/study-spots">
                    ← Back to Study Spots
                </Link>
            </main>
        );
    }

    return (
        <main className="spot-details-page">

            <div className="details-container">

                {/* Back Button */}
                <Link
                    to="/study-spots"
                    className="back-btn"
                >
                    ← Back to Study Spots
                </Link>


                {/* Hero Section */}
                <section className="details-hero">

                    <div className="details-emoji">
                        {spot.emoji}
                    </div>

                    <div className="details-rating">
                        ⭐ {spot.rating}
                    </div>

                </section>


                {/* Basic Information */}
                <section className="details-main">

                    <p className="details-location">
                        📍 {spot.location}
                    </p>

                    <h1>{spot.name}</h1>

                    <p className="details-reviews">
                        ⭐ {spot.rating} · {spot.reviews} student reviews
                    </p>

                    <p className="details-description">
                        {spot.description}
                    </p>

                </section>


                {/* Study Environment */}
                <section className="environment-section">

                    <div className="section-title">
                        <div>
                            <p className="small-heading">
                                STUDY ENVIRONMENT
                            </p>

                            <h2>What is it like here?</h2>

                            <p className="environment-subtitle">
                                Everything you need to know before choosing
                                this study spot.
                            </p>
                        </div>
                    </div>


                    <div className="environment-grid">

                        {/* Noise */}
                        <div className="environment-card">
                            <div className="environment-icon">
                                🤫
                            </div>

                            <div>
                                <p>Noise Level</p>
                                <h3>{spot.noise}</h3>
                            </div>
                        </div>


                        {/* Wi-Fi */}
                        <div className="environment-card">
                            <div className="environment-icon">
                                📶
                            </div>

                            <div>
                                <p>Wi-Fi Quality</p>
                                <h3>{spot.wifi}</h3>
                            </div>
                        </div>


                        {/* Outlets */}
                        <div className="environment-card">
                            <div className="environment-icon">
                                🔌
                            </div>

                            <div>
                                <p>Power Outlets</p>
                                <h3>{spot.outlets}</h3>
                            </div>
                        </div>


                        {/* Crowd */}
                        <div className="environment-card">
                            <div className="environment-icon">
                                👥
                            </div>

                            <div>
                                <p>Crowd Level</p>
                                <h3>{spot.crowd}</h3>
                            </div>
                        </div>

                    </div>

                </section>

                {/* STUDENT REVIEWS */}

                <section className="student-reviews-section">

                    <div className="reviews-heading">

                        <div>

                            <p className="small-heading">
                                STUDENT FEEDBACK
                            </p>

                            <h2>What students are saying</h2>

                            <p>
                                Real experiences shared by students who
                                have studied here.
                            </p>

                        </div>


                        <Link
                            to={`/study-spots/${spot.id}/review`}
                            className="small-review-btn"
                        >
                            + Write a Review
                        </Link>

                    </div>


                    {spotReviews.length > 0 ? (

                        <div className="reviews-list">

                            {spotReviews.map((review) => (

                                <div
                                    className="student-review-card"
                                    key={review.id}
                                >

                                    <div className="review-card-top">

                                        <div className="review-user">

                                            <div className="review-avatar">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>

                                            <div>
                                                <h3>{review.name}</h3>

                                                <p>Student</p>
                                            </div>

                                        </div>


                                        <div className="review-stars">

                                            {"★".repeat(review.rating)}

                                            {"☆".repeat(5 - review.rating)}

                                        </div>

                                    </div>


                                    <p className="student-review-text">
                                        "{review.review}"
                                    </p>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="no-reviews">

                            <div>💬</div>

                            <h3>No reviews yet</h3>

                            <p>
                                Be the first student to share your
                                experience with this study spot.
                            </p>

                            <Link
                                to={`/study-spots/${spot.id}/review`}
                            >
                                Write the First Review →
                            </Link>

                        </div>

                    )}

                </section>

                {/* Actions */}
                <section className="details-actions">

                    <button
                        className={`save-btn ${isFavorite ? "saved" : ""}`}
                        onClick={() => toggleFavorite(spot)}
                    >
                        {isFavorite ? "♥ Saved" : "♡ Save Spot"}
                    </button>

                    <Link
                        to={`/study-spots/${spot.id}/review`}
                        className="review-btn"
                    >
                        ⭐ Write a Review
                    </Link>

                </section>

            </div>

        </main>
    );
}

export default SpotDetails;
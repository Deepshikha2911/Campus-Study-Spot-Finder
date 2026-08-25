import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import studySpots from "../data/studySpots";
import { useAuth } from "../context/AuthContext";

function Review({ addReview }) {
    const { user } = useAuth();
    const { id } = useParams();

    const spot = studySpots.find(
        (spot) => spot.id === Number(id)
    );

    // Form data
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // If study spot doesn't exist
    if (!spot) {
        return (
            <main className="review-page">
                <div className="review-container">
                    <h1>Study Spot Not Found 😕</h1>

                    <Link to="/study-spots">
                        ← Back to Study Spots
                    </Link>
                </div>
            </main>
        );
    }

    async function handleSubmit(event) {

        event.preventDefault();

        if (rating === 0) {
            alert("Please select a rating.");
            return;
        }

        if (!user) {
            alert("Please log in to submit a review.");
            return;
        }

        const newReview = {

            spotId: spot.id,

            userId: user.uid,

            name: user.displayName || name,

            rating: rating,

            review: review

        };

        const reviewSaved =
            await addReview(newReview);

        if (reviewSaved) {
            setSubmitted(true);
        } else {
            alert(
                "Unable to submit your review. Please try again."
            );
        }
    }

    // Success message after submission
    if (submitted) {
        return (
            <main className="review-page">

                <div className="review-container">

                    <div className="review-success">

                        <div className="success-icon">
                            ✓
                        </div>

                        <h1>Review Submitted!</h1>

                        <p>
                            Thank you, {user.displayName || name}! Your feedback for
                            <strong> {spot.name}</strong> has been submitted.
                        </p>

                        <div className="success-actions">

                            <Link
                                to={`/study-spots/${spot.id}`}
                                className="back-details-btn"
                            >
                                ← Back to Study Spot
                            </Link>

                            <Link
                                to="/study-spots"
                                className="explore-more-btn"
                            >
                                Explore More Spots
                            </Link>

                        </div>

                    </div>

                </div>

            </main>
        );
    }

    return (
        <main className="review-page">

            <div className="review-container">

                {/* Back Button */}

                <Link
                    to={`/study-spots/${spot.id}`}
                    className="back-btn"
                >
                    ← Back to {spot.name}
                </Link>


                {/* Heading */}

                <section className="review-heading">

                    <p className="small-heading">
                        SHARE YOUR EXPERIENCE
                    </p>

                    <h1>
                        How was your time at
                        <span> {spot.name}?</span>
                    </h1>

                    <p>
                        Your review will help other students find
                        the perfect place to study.
                    </p>

                </section>


                {/* Review Form */}

                <form
                    className="review-form"
                    onSubmit={handleSubmit}
                >

                    {/* Name */}

                    <div className="form-group">

                        <label>Your Name</label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Rating */}

                    <div className="form-group">

                        <label>Your Rating</label>

                        <p className="rating-text">
                            Select a rating for this study spot
                        </p>

                        <div className="star-rating">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <button
                                    type="button"
                                    key={star}
                                    className={
                                        star <= rating
                                            ? "star active-star"
                                            : "star"
                                    }
                                    onClick={() => setRating(star)}
                                >
                                    ★
                                </button>

                            ))}

                        </div>

                    </div>


                    {/* Review */}

                    <div className="form-group">

                        <label>Your Review</label>

                        <textarea
                            rows="6"
                            placeholder="Tell other students about your experience..."
                            value={review}
                            onChange={(event) =>
                                setReview(event.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="submit-review-btn"
                    >
                        Submit Review →
                    </button>

                </form>

            </div>

        </main>
    );
}

export default Review;
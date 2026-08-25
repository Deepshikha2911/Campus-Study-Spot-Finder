import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import studySpots from "../data/studySpots";
import { useAuth } from "../context/AuthContext";

function SpotDetails({
    favorites,
    toggleFavorite,
    reviews,
    updateReview,
    deleteReview
}) {
    const { user } = useAuth();
    // Get the ID from the URL
    const { id } = useParams();

    // Review editing states
    const [editingReviewId, setEditingReviewId] =
        useState(null);

    const [editedRating, setEditedRating] =
        useState(0);

    const [editedText, setEditedText] =
        useState("");

    // Delete confirmation state
    const [reviewToDelete, setReviewToDelete] =
        useState(null);


    // Find the matching study spot
    const spot = studySpots.find(
        (spot) => spot.id === Number(id)
    );


    // If no study spot is found
    if (!spot) {
        return (
            <main className="page-container">

                <h1>
                    Study Spot Not Found 😕
                </h1>

                <Link to="/study-spots">
                    ← Back to Study Spots
                </Link>

            </main>
        );
    }


    // Check if spot is already in favorites
    const isFavorite = favorites.some(
        (favorite) => favorite.id === spot.id
    );


    // Get reviews for the current study spot
    const spotReviews = reviews.filter(
        (review) => review.spotId === spot.id
    );


    // ================= EDIT REVIEW =================

    function handleEdit(review) {

        setEditingReviewId(review.id);

        setEditedRating(review.rating);

        setEditedText(review.review);

    }


    async function handleSaveEdit(review) {

        // Validate rating
        if (editedRating === 0) {
            alert("Please select a rating.");
            return;
        }


        // Validate review text
        if (!editedText.trim()) {
            alert("Please write your review.");
            return;
        }


        const updatedReview = {
            ...review,
            rating: editedRating,
            review: editedText.trim(),
        };


        const success =
            await updateReview(updatedReview);


        if (success) {

            setEditingReviewId(null);

            setEditedRating(0);

            setEditedText("");

        } else {

            alert(
                "Unable to update your review. Please try again."
            );

        }
    }


    function handleCancelEdit() {

        setEditingReviewId(null);

        setEditedRating(0);

        setEditedText("");

    }


    // ================= DELETE REVIEW =================

    function handleDelete(review) {

        setReviewToDelete(review);

    }


    async function confirmDelete() {

        if (!reviewToDelete) {
            return;
        }


        const success = await deleteReview(
            reviewToDelete.id
        );


        if (success) {

            setReviewToDelete(null);

        } else {

            alert(
                "Unable to delete your review. Please try again."
            );

        }
    }


    function cancelDelete() {

        setReviewToDelete(null);

    }


    return (

        <main className="spot-details-page">

            <div className="details-container">


                {/* ================= BACK BUTTON ================= */}

                <Link
                    to="/study-spots"
                    className="back-btn"
                >
                    ← Back to Study Spots
                </Link>


                {/* ================= HERO SECTION ================= */}

                <section className="details-hero">

                    <div className="details-emoji">
                        {spot.emoji}
                    </div>

                    <div className="details-rating">
                        ⭐ {spot.rating}
                    </div>

                </section>


                {/* ================= BASIC INFORMATION ================= */}

                <section className="details-main">

                    <p className="details-location">
                        📍 {spot.location}
                    </p>

                    <h1>
                        {spot.name}
                    </h1>

                    <p className="details-reviews">
                        ⭐ {spot.rating} · {spot.reviews} student reviews
                    </p>

                    <p className="details-description">
                        {spot.description}
                    </p>

                </section>


                {/* ================= STUDY ENVIRONMENT ================= */}

                <section className="environment-section">

                    <div className="section-title">

                        <div>

                            <p className="small-heading">
                                STUDY ENVIRONMENT
                            </p>

                            <h2>
                                What is it like here?
                            </h2>

                            <p className="environment-subtitle">
                                Everything you need to know before choosing
                                this study spot.
                            </p>

                        </div>

                    </div>


                    <div className="environment-grid">


                        <div className="environment-card">

                            <div className="environment-icon">
                                🤫
                            </div>

                            <div>

                                <p>
                                    Noise Level
                                </p>

                                <h3>
                                    {spot.noise}
                                </h3>

                            </div>

                        </div>


                        <div className="environment-card">

                            <div className="environment-icon">
                                📶
                            </div>

                            <div>

                                <p>
                                    Wi-Fi Quality
                                </p>

                                <h3>
                                    {spot.wifi}
                                </h3>

                            </div>

                        </div>


                        <div className="environment-card">

                            <div className="environment-icon">
                                🔌
                            </div>

                            <div>

                                <p>
                                    Power Outlets
                                </p>

                                <h3>
                                    {spot.outlets}
                                </h3>

                            </div>

                        </div>


                        <div className="environment-card">

                            <div className="environment-icon">
                                👥
                            </div>

                            <div>

                                <p>
                                    Crowd Level
                                </p>

                                <h3>
                                    {spot.crowd}
                                </h3>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= STUDENT REVIEWS ================= */}

                <section className="student-reviews-section">

                    <div className="reviews-heading">

                        <div>

                            <p className="small-heading">
                                STUDENT FEEDBACK
                            </p>

                            <h2>
                                What students are saying
                            </h2>

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


                                    {/* REVIEW HEADER */}

                                    <div className="review-card-top">

                                        <div className="review-user">

                                            <div className="review-avatar">

                                                {review.name
                                                    .charAt(0)
                                                    .toUpperCase()}

                                            </div>


                                            <div>

                                                <h3>
                                                    {review.name}
                                                </h3>

                                                <p>
                                                    Student
                                                </p>

                                            </div>

                                        </div>


                                        {/* RATING */}

                                        <div className="review-stars">

                                            {editingReviewId === review.id
                                                ? (

                                                    [1, 2, 3, 4, 5].map(
                                                        (star) => (

                                                            <button
                                                                type="button"
                                                                key={star}
                                                                className={
                                                                    star <= editedRating
                                                                        ? "star active-star"
                                                                        : "star"
                                                                }
                                                                onClick={() =>
                                                                    setEditedRating(star)
                                                                }
                                                            >
                                                                ★
                                                            </button>

                                                        )
                                                    )

                                                ) : (

                                                    <>

                                                        {"★".repeat(
                                                            review.rating
                                                        )}

                                                        {"☆".repeat(
                                                            5 - review.rating
                                                        )}

                                                    </>

                                                )}

                                        </div>

                                    </div>


                                    {/* ================= EDIT MODE ================= */}

                                    {editingReviewId === review.id ? (

                                        <div className="review-edit-container">


                                            <textarea
                                                className="edit-review-textarea"
                                                value={editedText}
                                                onChange={(event) =>
                                                    setEditedText(
                                                        event.target.value
                                                    )
                                                }
                                                placeholder="Update your review..."
                                                rows="5"
                                            />


                                            <div className="review-edit-actions">

                                                <button
                                                    type="button"
                                                    className="save-review-btn"
                                                    onClick={() =>
                                                        handleSaveEdit(review)
                                                    }
                                                >
                                                    ✓ Save Changes
                                                </button>


                                                <button
                                                    type="button"
                                                    className="cancel-review-btn"
                                                    onClick={
                                                        handleCancelEdit
                                                    }
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        </div>

                                    ) : (

                                        <>


                                            {/* REVIEW TEXT */}

                                            <p className="student-review-text">

                                                "{review.review}"

                                            </p>


                                            {/* REVIEW ACTIONS */}

                                            {user &&
                                                user.uid === review.userId && (

                                                    <div className="review-actions">

                                                        <button
                                                            type="button"
                                                            className="edit-review-btn"
                                                            onClick={() =>
                                                                handleEdit(review)
                                                            }
                                                        >
                                                            <span>✏</span>
                                                            Edit
                                                        </button>


                                                        <button
                                                            type="button"
                                                            className="delete-review-btn"
                                                            onClick={() =>
                                                                handleDelete(review)
                                                            }
                                                        >
                                                            <span>🗑</span>
                                                            Delete
                                                        </button>

                                                    </div>

                                                )}

                                        </>

                                    )}

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="no-reviews">

                            <div>
                                💬
                            </div>

                            <h3>
                                No reviews yet
                            </h3>

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


                {/* ================= BOTTOM ACTIONS ================= */}

                <section className="details-actions">

                    <button
                        className={`save-btn ${isFavorite ? "saved" : ""}`}
                        onClick={() => toggleFavorite(spot)}
                    >
                        {isFavorite
                            ? "♥ Saved"
                            : "♡ Save Spot"}
                    </button>


                    <Link
                        to={`/study-spots/${spot.id}/review`}
                        className="review-btn"
                    >
                        ⭐ Write a Review
                    </Link>

                </section>

            </div>


            {/* ================= DELETE CONFIRMATION MODAL ================= */}

            {reviewToDelete && (

                <div className="delete-modal-overlay">

                    <div className="delete-modal">


                        <div className="delete-modal-icon">
                            🗑️
                        </div>


                        <h2>
                            Delete Review?
                        </h2>


                        <p>
                            Are you sure you want to delete your review?
                            This action cannot be undone.
                        </p>


                        <div className="delete-modal-actions">

                            <button
                                type="button"
                                className="cancel-delete-btn"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                className="confirm-delete-btn"
                                onClick={confirmDelete}
                            >
                                Yes, Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </main>

    );
}

export default SpotDetails;
import { useState } from "react";
import { Link } from "react-router-dom";

import studySpots from "../data/studySpots";
import { useAuth } from "../context/AuthContext";


function MyReviews({
    reviews,
    updateReview,
    deleteReview
}) {

    const { user } = useAuth();


    // ================= STATES =================

    const [editingReviewId, setEditingReviewId] =
        useState(null);

    const [editedRating, setEditedRating] =
        useState(0);

    const [editedText, setEditedText] =
        useState("");

    const [reviewToDelete, setReviewToDelete] =
        useState(null);


    // ================= GET CURRENT USER REVIEWS =================

    const userReviews = reviews.filter(
        (review) => review.userId === user?.uid
    );


    // ================= EDIT REVIEW =================

    function handleEdit(review) {

        setEditingReviewId(review.id);

        setEditedRating(review.rating);

        setEditedText(review.review);

    }


    async function handleSaveEdit(review) {

        if (editedRating === 0) {

            alert("Please select a rating.");

            return;
        }


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


        const success =
            await deleteReview(reviewToDelete.id);


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

        <main className="my-reviews-page">

            <div className="my-reviews-container">


                {/* ================= PAGE HEADING ================= */}

                <section className="my-reviews-heading">

                    <p className="small-heading">
                        YOUR FEEDBACK
                    </p>

                    <h1>
                        My Reviews
                    </h1>

                    <p>
                        View and manage the experiences you have shared
                        with other students.
                    </p>

                </section>


                {/* ================= REVIEWS LIST ================= */}

                {userReviews.length > 0 ? (

                    <div className="my-reviews-list">

                        {userReviews.map((review) => {

                            // Find the study spot for this review
                            const spot = studySpots.find(
                                (spot) =>
                                    spot.id === review.spotId
                            );


                            return (

                                <div
                                    className="my-review-card"
                                    key={review.id}
                                >


                                    {/* STUDY SPOT INFORMATION */}

                                    <div className="my-review-card-top">

                                        <div className="review-spot-info">

                                            <div className="review-spot-emoji">

                                                {spot?.emoji || "📍"}

                                            </div>


                                            <div>

                                                <p className="review-spot-label">

                                                    REVIEW FOR

                                                </p>


                                                <h2>

                                                    {spot?.name ||
                                                        "Study Spot"}

                                                </h2>


                                                <p className="review-spot-location">

                                                    📍 {spot?.location ||
                                                        "Location unavailable"}

                                                </p>

                                            </div>

                                        </div>


                                        {/* RATING */}

                                        <div className="my-review-rating">

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

                                                    <span>

                                                        {"★".repeat(
                                                            review.rating
                                                        )}

                                                        {"☆".repeat(
                                                            5 - review.rating
                                                        )}

                                                    </span>

                                                )}

                                        </div>

                                    </div>


                                    {/* ================= EDIT MODE ================= */}

                                    {editingReviewId === review.id ? (

                                        <div className="my-review-edit-section">

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

                                            <p className="my-review-text">

                                                "{review.review}"

                                            </p>


                                            {/* ACTIONS */}

                                            <div className="my-review-actions">

                                                <Link
                                                    to={`/study-spots/${review.spotId}`}
                                                    className="view-spot-btn"
                                                >
                                                    View Study Spot →
                                                </Link>


                                                <div className="my-review-action-buttons">

                                                    <button
                                                        type="button"
                                                        className="edit-review-btn"
                                                        onClick={() =>
                                                            handleEdit(review)
                                                        }
                                                    >
                                                        ✏ Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="delete-review-btn"
                                                        onClick={() =>
                                                            handleDelete(review)
                                                        }
                                                    >
                                                        🗑 Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                ) : (

                    /* ================= EMPTY STATE ================= */

                    <div className="no-my-reviews">

                        <div className="no-my-reviews-icon">
                            ⭐
                        </div>


                        <h2>
                            No reviews yet
                        </h2>


                        <p>
                            You haven't shared any experiences yet.
                            Explore a study spot and let other students
                            know what you think!
                        </p>


                        <Link
                            to="/study-spots"
                            className="explore-spots-btn"
                        >
                            Explore Study Spots →
                        </Link>

                    </div>

                )}

            </div>


            {/* ================= DELETE CONFIRMATION ================= */}

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


export default MyReviews;
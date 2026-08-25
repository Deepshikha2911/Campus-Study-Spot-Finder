import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "./firebase";

import PageLoader from "./components/PageLoader";
import ScrollToTop from "./components/ScrollToTop";
import { useAuth } from "./context/AuthContext";

import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudySpots from "./pages/StudySpots";
import Favorites from "./pages/Favorites";
import About from "./pages/About";
import SpotDetails from "./pages/SpotDetails";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const { user, loading } = useAuth();
  const location = useLocation();

  // Page transition loader
  useEffect(() => {
    setPageLoading(true);

    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);


  useEffect(() => {

    async function loadFavorites() {

      if (!user) {
        setFavorites([]);
        return;
      }

      try {

        const userRef = doc(
          db,
          "users",
          user.uid
        );

        const userSnapshot =
          await getDoc(userRef);

        if (userSnapshot.exists()) {

          const userData =
            userSnapshot.data();

          setFavorites(
            userData.favorites || []
          );

        }

      } catch (error) {

        console.error(
          "Error loading favorites:",
          error
        );

      }
    }

    loadFavorites();

  }, [user]);

  // Load all reviews from Firestore
  useEffect(() => {

    async function loadReviews() {

      try {

        const reviewsSnapshot =
          await getDocs(
            collection(db, "reviews")
          );

        const loadedReviews =
          reviewsSnapshot.docs.map((reviewDoc) => ({

            id: reviewDoc.id,

            ...reviewDoc.data(),

          }));

        setReviews(loadedReviews);

      } catch (error) {

        console.error(
          "Error loading reviews:",
          error
        );

      }

    }

    loadReviews();

  }, []);

  if (loading) {
    return <PageLoader />;
  }

  // Toggle favorite and save to Firestore
  async function toggleFavorite(spot) {

    // Make sure user is logged in
    if (!user) {
      return;
    }

    try {

      const alreadyExists = favorites.some(
        (item) => item.id === spot.id
      );

      let updatedFavorites;

      if (alreadyExists) {

        // Remove spot from favorites
        updatedFavorites = favorites.filter(
          (item) => item.id !== spot.id
        );

      } else {

        // Add spot to favorites
        updatedFavorites = [
          ...favorites,
          spot,
        ];

      }


      // Update React state immediately
      setFavorites(updatedFavorites);


      // Firestore user document reference
      const userRef = doc(
        db,
        "users",
        user.uid
      );


      // Save updated favorites to Firestore
      await updateDoc(
        userRef,
        {
          favorites: updatedFavorites,
        }
      );

    } catch (error) {

      console.error(
        "Error updating favorites:",
        error
      );

    }
  }

  // Add review
  async function addReview(review) {

    if (!user) {
      return false;
    }

    try {

      const reviewData = {

        spotId: review.spotId,

        userId: review.userId,

        name: review.name,

        rating: review.rating,

        review: review.review,

      };


      // Add review to Firestore
      const reviewRef =
        await addDoc(
          collection(db, "reviews"),
          reviewData
        );


      // Add Firestore document ID to React state
      const newReview = {

        id: reviewRef.id,

        ...reviewData,

      };


      setReviews((previousReviews) => [

        ...previousReviews,

        newReview,

      ]);


      return true;

    } catch (error) {

      console.error(
        "Error saving review:",
        error
      );

      return false;

    }

  }

  // Update review
  async function updateReview(updatedReview) {

    try {

      const reviewRef = doc(
        db,
        "reviews",
        updatedReview.id
      );


      await updateDoc(
        reviewRef,
        {

          rating: updatedReview.rating,

          review: updatedReview.review,

        }
      );


      setReviews((previousReviews) =>

        previousReviews.map((review) =>

          review.id === updatedReview.id
            ? updatedReview
            : review

        )

      );


      return true;

    } catch (error) {

      console.error(
        "Error updating review:",
        error
      );

      return false;

    }

  }


  // Delete review
  async function deleteReview(reviewId) {

    try {

      const reviewRef = doc(
        db,
        "reviews",
        reviewId
      );


      await deleteDoc(reviewRef);


      setReviews((previousReviews) =>

        previousReviews.filter(
          (review) => review.id !== reviewId
        )

      );


      return true;

    } catch (error) {

      console.error(
        "Error deleting review:",
        error
      );

      return false;

    }

  }

  return (
    <>
      <ScrollToTop />

      {pageLoading ? (
        <PageLoader />
      ) : (
        <>
          <Header />

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={<Home />}
            />

            {/* LOGIN */}
            <Route
              path="/login"
              element={
                user ? <StudySpots /> : <Login />
              }
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={
                user ? <StudySpots /> : <Register />
              }
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile
                    favorites={favorites}
                    reviews={reviews}
                  />
                </ProtectedRoute>
              }
            />

            {/* EDIT PROFILE */}
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            {/* STUDY SPOTS */}
            <Route
              path="/study-spots"
              element={
                <ProtectedRoute>
                  <StudySpots />
                </ProtectedRoute>
              }
            />

            {/* FAVORITES */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                </ProtectedRoute>
              }
            />

            {/* ABOUT */}
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />

            {/* SPOT DETAILS */}
            <Route
              path="/study-spots/:id"
              element={
                <ProtectedRoute>

                  <SpotDetails
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    reviews={reviews}
                    updateReview={updateReview}
                    deleteReview={deleteReview}
                  />

                </ProtectedRoute>
              }
            />

            {/* REVIEW */}
            <Route
              path="/study-spots/:id/review"
              element={
                <ProtectedRoute>

                  <Review
                    addReview={addReview}
                  />

                </ProtectedRoute>
              }
            />

          </Routes>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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

function App() {
  // =========================
  // ALL HOOKS MUST BE AT TOP
  // =========================

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

  // Wait until Firebase finishes checking authentication
  // IMPORTANT: This comes AFTER all hooks
  if (loading) {
    return <PageLoader />;
  }

  // =========================
  // FAVORITES
  // =========================

  function toggleFavorite(spot) {
    setFavorites((previousFavorites) => {
      const alreadyExists = previousFavorites.some(
        (item) => item.id === spot.id
      );

      if (alreadyExists) {
        return previousFavorites.filter(
          (item) => item.id !== spot.id
        );
      }

      return [...previousFavorites, spot];
    });
  }

  // =========================
  // REVIEWS
  // =========================

  function addReview(review) {
    setReviews((previousReviews) => [
      ...previousReviews,
      review,
    ]);
  }

  // =========================
  // MAIN APPLICATION
  // =========================

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
                  <Profile />
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
                  />
                </ProtectedRoute>
              }
            />

            {/* REVIEW */}
            <Route
              path="/study-spots/:id/review"
              element={
                <ProtectedRoute>
                  <Review addReview={addReview} />
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
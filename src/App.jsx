import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import your pages
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

  // Keep your existing states
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { user, loading } = useAuth();

  // Your existing favorite function
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

  // Your existing review function
  function addReview(review) {
    setReviews((previousReviews) => [
      ...previousReviews,
      review,
    ]);
  }

  // Wait until Firebase finishes checking login
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
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
  );
}

export default App;
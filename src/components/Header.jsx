import { useEffect, useState } from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState("");


  useEffect(() => {

    async function loadProfilePhoto() {

      if (!user) {
        setProfilePhoto("");
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

          setProfilePhoto(
            userData.profilePhoto || ""
          );

        }

      } catch (error) {

        console.error(
          "Error loading profile photo:",
          error
        );

      }

    }

    loadProfilePhoto();

  }, [user]);
  

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get first letter of user's name
  const firstLetter = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase();

  return (
    <header className="header">
      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="logo">
          <span>StudySpot</span>
        </Link>

        {/* NAVIGATION */}
        <nav className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active-nav-link" : "nav-link"
            }
            end
          >
            Home
          </NavLink>

          {user ? (
            <>
              <NavLink
                to="/study-spots"
                className={({ isActive }) =>
                  isActive ? "nav-link active-nav-link" : "nav-link"
                }
              >
                Study Spots
              </NavLink>

              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "nav-link active-nav-link" : "nav-link"
                }
              >
                Favorites
              </NavLink>

              <NavLink
                to="/my-reviews"
                className={({ isActive }) =>
                  isActive ? "nav-link active-nav-link" : "nav-link"
                }
              >
                My Reviews
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active-nav-link" : "nav-link"
                }
              >
                About
              </NavLink>

              {/* PROFILE */}
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "profile-nav active-profile-nav"
                    : "profile-nav"
                }
              >
                <div className="header-avatar">

                  {profilePhoto ? (

                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="header-avatar-image"
                    />

                  ) : (

                    <span>
                      {firstLetter || "U"}
                    </span>

                  )}

                </div>

                <span>
                  {user.displayName || "Profile"}
                </span>
              </NavLink>

              {/* LOGOUT */}
              <button
                className="header-logout-btn"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Log In
              </Link>

              <Link to="/register" className="get-started-btn">
                Get Started
              </Link>
            </>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Header;
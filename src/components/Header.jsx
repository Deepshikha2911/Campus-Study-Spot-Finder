import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
                  {firstLetter}
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
import { Link, useNavigate } from "react-router-dom";
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

          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/study-spots">Study Spots</Link>
              <Link to="/favorites">Favorites</Link>
              <Link to="/about">About</Link>

              {/* PROFILE */}
              <Link to="/profile" className="profile-nav">
                <div className="header-avatar">
                  {firstLetter}
                </div>

                <span>
                  {user.displayName || "Profile"}
                </span>
              </Link>

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
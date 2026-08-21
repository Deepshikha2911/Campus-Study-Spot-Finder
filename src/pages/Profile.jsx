import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
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

    // Get first letter for avatar
    const firstLetter = user?.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : user?.email.charAt(0).toUpperCase();

    return (
        <main className="profile-page">
            <div className="profile-container">

                {/* Profile Header */}
                <section className="profile-card">

                    <div className="profile-avatar">
                        {firstLetter}
                    </div>

                    <h1>
                        {user?.displayName || "StudySpot User"}
                    </h1>

                    <p className="profile-email">
                        {user?.email}
                    </p>

                </section>


                {/* Account Information */}
                <section className="account-card">

                    <h2>Account Information</h2>

                    <div className="account-info">

                        <div className="info-item">
                            <span className="info-label">
                                Full Name
                            </span>

                            <span className="info-value">
                                {user?.displayName || "Not provided"}
                            </span>
                        </div>


                        <div className="info-item">
                            <span className="info-label">
                                Email Address
                            </span>

                            <span className="info-value">
                                {user?.email}
                            </span>
                        </div>

                    </div>


                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>

                </section>

            </div>
        </main>
    );
}

export default Profile;
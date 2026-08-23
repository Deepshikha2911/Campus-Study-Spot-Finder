import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile({ studentInfo, favorites, reviews }) {
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
        : user?.email?.charAt(0).toUpperCase();


    return (
        <main className="profile-page">
            <div className="profile-container">

                {/* ================= PROFILE HERO ================= */}

                <section className="profile-hero-card">
                    <div className="profile-avatar large-avatar">
                        {firstLetter || "U"}
                    </div>

                    <div className="profile-hero-info">
                        <h1>
                            {user?.displayName || "StudySpot User"}
                        </h1>

                        <p className="profile-email">
                            {user?.email}
                        </p>

                        <div className="student-badges">
                            <span>{studentInfo.branch}</span>
                            <span>{studentInfo.semester}</span>
                        </div>

                        <p className="university-name">
                            {studentInfo.university}
                        </p>
                    </div>

                    <button
                        className="edit-profile-btn"
                        onClick={() => navigate("/edit-profile")}
                    >
                        Edit Profile
                    </button>
                </section>


                {/* ================= PERSONAL INFORMATION ================= */}

                <section className="profile-section-card">
                    <div className="profile-section-title">
                        <span className="section-icon">👤</span>

                        <div>
                            <h2>Personal Information</h2>
                            <p>Your basic account and contact details</p>
                        </div>
                    </div>

                    <div className="profile-info-grid">

                        <div className="profile-info-item">
                            <span className="info-label">Full Name</span>
                            <span className="info-value">
                                {user?.displayName || "Not provided"}
                            </span>
                        </div>

                        <div className="profile-info-item">
                            <span className="info-label">Student ID</span>
                            <span className="info-value">
                                {studentInfo.studentId}
                            </span>
                        </div>

                        <div className="profile-info-item">
                            <span className="info-label">Email Address</span>
                            <span className="info-value">
                                {user?.email}
                            </span>
                        </div>

                        <div className="profile-info-item">
                            <span className="info-label">Phone Number</span>
                            <span className="info-value">
                                {studentInfo.phone}
                            </span>
                        </div>

                    </div>
                </section>


                {/* ================= ACADEMIC INFORMATION ================= */}

                <section className="profile-section-card">
                    <div className="profile-section-title">
                        <span className="section-icon">🎓</span>

                        <div>
                            <h2>Academic Information</h2>
                            <p>Your university and course details</p>
                        </div>
                    </div>

                    <div className="profile-info-grid">

                        <div className="profile-info-item">
                            <span className="info-label">University</span>
                            <span className="info-value">
                                {studentInfo.university}
                            </span>
                        </div>

                        <div className="profile-info-item">
                            <span className="info-label">Program</span>
                            <span className="info-value">
                                {studentInfo.program}
                            </span>
                        </div>

                        <div className="profile-info-item">
                            <span className="info-label">Branch</span>
                            <span className="info-value">
                                {studentInfo.branch}
                            </span>
                        </div>

                        <div className="profile-info-item">
                            <span className="info-label">Semester</span>
                            <span className="info-value">
                                {studentInfo.semester}
                            </span>
                        </div>

                    </div>
                </section>


                {/* ================= STUDY PREFERENCES ================= */}

                <section className="profile-section-card">
                    <div className="profile-section-title">
                        <span className="section-icon">📚</span>

                        <div>
                            <h2>Study Preferences</h2>
                            <p>Help us recommend better study spots for you</p>
                        </div>
                    </div>

                    <div className="preferences-grid">

                        <div className="preference-card">
                            <span className="preference-icon">🤫</span>
                            <div>
                                <p>Preferred Noise Level</p>
                                <strong>{studentInfo.noisePreference}</strong>
                            </div>
                        </div>

                        <div className="preference-card">
                            <span className="preference-icon">👥</span>
                            <div>
                                <p>Crowd Preference</p>
                                <strong>{studentInfo.crowdPreference}</strong>
                            </div>
                        </div>

                        <div className="preference-card">
                            <span className="preference-icon">📶</span>
                            <div>
                                <p>Wi-Fi</p>
                                <strong>
                                    {studentInfo.wifi ? "Important" : "Not Important"}
                                </strong>
                            </div>
                        </div>

                        <div className="preference-card">
                            <span className="preference-icon">🔌</span>
                            <div>
                                <p>Power Outlets</p>
                                <strong>
                                    {studentInfo.outlets ? "Important" : "Not Important"}
                                </strong>
                            </div>
                        </div>

                    </div>
                </section>


                {/* ================= ACTIVITY ================= */}

                <section className="profile-section-card">
                    <div className="profile-section-title">
                        <span className="section-icon">📊</span>

                        <div>
                            <h2>Your Study Activity</h2>
                            <p>Your activity on Campus Study Spot Finder</p>
                        </div>
                    </div>

                    <div className="activity-grid">

                        <div className="activity-card">
                            <span className="activity-icon">❤️</span>
                            <h3>{favorites.length}</h3>
                            <p>Favorites</p>
                        </div>

                        <div className="activity-card">
                            <span className="activity-icon">⭐</span>
                            <h3>{reviews.length}</h3>
                            <p>Reviews</p>
                        </div>

                        <div className="activity-card">
                            <span className="activity-icon">📍</span>
                            <h3>0</h3>
                            <p>Study Spots</p>
                        </div>

                    </div>
                </section>


                {/* ================= LOGOUT ================= */}

                <section className="profile-logout-section">
                    <div>
                        <h3>Ready to leave?</h3>
                        <p>You can always come back and find your perfect study space.</p>
                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Log Out →
                    </button>
                </section>

            </div>
        </main>
    );
}

export default Profile;
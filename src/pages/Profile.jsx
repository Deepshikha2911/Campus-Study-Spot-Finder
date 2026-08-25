import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    doc,
    getDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";


function Profile({ favorites = [], reviews = [] }) {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Store Firestore profile information
    const [studentInfo, setStudentInfo] = useState(null);

    // Loading state while fetching profile
    const [profileLoading, setProfileLoading] = useState(true);


    // Fetch user profile from Firestore
    useEffect(() => {

        async function loadProfile() {

            if (!user) {
                setProfileLoading(false);
                return;
            }

            try {

                const userRef = doc(
                    db,
                    "users",
                    user.uid
                );

                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {

                    setStudentInfo(
                        userSnapshot.data()
                    );

                } else {

                    console.log(
                        "User profile does not exist in Firestore."
                    );

                    setStudentInfo({});

                }

            } catch (error) {

                console.error(
                    "Error loading profile:",
                    error
                );

                setStudentInfo({});

            } finally {

                setProfileLoading(false);

            }
        }

        loadProfile();

    }, [user]);


    // Handle logout
    const handleLogout = async () => {

        try {

            await logout();

            navigate("/");

        } catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }
    };


    // Show proper value for empty fields
    const showValue = (value) => {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return "Not provided yet";
        }

        return value;
    };


    // Loading screen while profile data is being fetched
    if (profileLoading) {

        return (

            <main className="profile-page">

                <div className="profile-container">

                    <div className="profile-loading">

                        Loading your profile...

                    </div>

                </div>

            </main>

        );
    }


    // Get first letter for avatar
    const firstLetter = user?.displayName
        ? user.displayName.charAt(0).toUpperCase()
        : user?.email?.charAt(0).toUpperCase();

    // Get only the reviews written by the currently logged-in user
    const userReviews = reviews.filter(
        (review) => review.userId === user?.uid
    );


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

                            {studentInfo?.fullName ||
                                user?.displayName ||
                                "StudySpot User"}

                        </h1>


                        <p className="profile-email">

                            {user?.email}

                        </p>


                        {/* Only show badges if information exists */}

                        {(studentInfo?.branch ||
                            studentInfo?.semester) && (

                                <div className="student-badges">

                                    {studentInfo?.branch && (

                                        <span>

                                            {studentInfo.branch}

                                        </span>

                                    )}


                                    {studentInfo?.semester && (

                                        <span>

                                            {studentInfo.semester}

                                        </span>

                                    )}

                                </div>

                            )}


                        {/* Show university or profile completion message */}

                        {studentInfo?.university ? (

                            <p className="university-name">

                                {studentInfo.university}

                            </p>

                        ) : (

                            <p className="university-name empty-profile-info">

                                Complete your academic profile

                            </p>

                        )}

                    </div>


                    <button
                        className="edit-profile-btn"
                        onClick={() =>
                            navigate("/edit-profile")
                        }
                    >

                        Edit Profile

                    </button>

                </section>


                {/* ================= PERSONAL INFORMATION ================= */}

                <section className="profile-section-card">

                    <div className="profile-section-title">

                        <span className="section-icon">

                            👤

                        </span>


                        <div>

                            <h2>
                                Personal Information
                            </h2>

                            <p>
                                Your basic account and contact details
                            </p>

                        </div>

                    </div>


                    <div className="profile-info-grid">


                        <div className="profile-info-item">

                            <span className="info-label">
                                Full Name
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.fullName ||
                                    user?.displayName
                                )}

                            </span>

                        </div>


                        <div className="profile-info-item">

                            <span className="info-label">
                                Student ID
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.studentId
                                )}

                            </span>

                        </div>


                        <div className="profile-info-item">

                            <span className="info-label">
                                Email Address
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.email ||
                                    user?.email
                                )}

                            </span>

                        </div>


                        <div className="profile-info-item">

                            <span className="info-label">
                                Phone Number
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.phone
                                )}

                            </span>

                        </div>

                    </div>

                </section>


                {/* ================= ACADEMIC INFORMATION ================= */}

                <section className="profile-section-card">

                    <div className="profile-section-title">

                        <span className="section-icon">

                            🎓

                        </span>


                        <div>

                            <h2>
                                Academic Information
                            </h2>

                            <p>
                                Your university and course details
                            </p>

                        </div>

                    </div>


                    <div className="profile-info-grid">


                        <div className="profile-info-item">

                            <span className="info-label">
                                University
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.university
                                )}

                            </span>

                        </div>


                        <div className="profile-info-item">

                            <span className="info-label">
                                Program
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.program
                                )}

                            </span>

                        </div>


                        <div className="profile-info-item">

                            <span className="info-label">
                                Branch
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.branch
                                )}

                            </span>

                        </div>


                        <div className="profile-info-item">

                            <span className="info-label">
                                Semester
                            </span>

                            <span className="info-value">

                                {showValue(
                                    studentInfo?.semester
                                )}

                            </span>

                        </div>

                    </div>

                </section>


                {/* ================= STUDY PREFERENCES ================= */}

                <section className="profile-section-card">

                    <div className="profile-section-title">

                        <span className="section-icon">

                            📚

                        </span>


                        <div>

                            <h2>
                                Study Preferences
                            </h2>

                            <p>
                                Help us recommend better study spots for you
                            </p>

                        </div>

                    </div>


                    <div className="preferences-grid">


                        <div className="preference-card">

                            <span className="preference-icon">

                                🤫

                            </span>

                            <div>

                                <p>
                                    Preferred Noise Level
                                </p>

                                <strong>

                                    {showValue(
                                        studentInfo?.noisePreference
                                    )}

                                </strong>

                            </div>

                        </div>


                        <div className="preference-card">

                            <span className="preference-icon">

                                👥

                            </span>

                            <div>

                                <p>
                                    Crowd Preference
                                </p>

                                <strong>

                                    {showValue(
                                        studentInfo?.crowdPreference
                                    )}

                                </strong>

                            </div>

                        </div>


                        <div className="preference-card">

                            <span className="preference-icon">

                                📶

                            </span>

                            <div>

                                <p>
                                    Wi-Fi
                                </p>

                                <strong>

                                    {studentInfo?.wifi === true
                                        ? "Important"
                                        : studentInfo?.wifi === false
                                            ? "Not Important"
                                            : "Not provided yet"}

                                </strong>

                            </div>

                        </div>


                        <div className="preference-card">

                            <span className="preference-icon">

                                🔌

                            </span>

                            <div>

                                <p>
                                    Power Outlets
                                </p>

                                <strong>

                                    {studentInfo?.outlets === true
                                        ? "Important"
                                        : studentInfo?.outlets === false
                                            ? "Not Important"
                                            : "Not provided yet"}

                                </strong>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= ACTIVITY ================= */}

                <section className="profile-section-card">

                    <div className="profile-section-title">

                        <span className="section-icon">

                            📊

                        </span>


                        <div>

                            <h2>
                                Your Study Activity
                            </h2>

                            <p>
                                Your activity on Campus Study Spot Finder
                            </p>

                        </div>

                    </div>


                    <div className="activity-grid">


                        <div
                            className="activity-card clickable-activity-card"
                            onClick={() => navigate("/favorites")}
                        >

                            <span className="activity-icon">
                                ❤️
                            </span>

                            <h3>
                                {favorites.length}
                            </h3>

                            <p>
                                Favorites
                            </p>

                            <span className="activity-arrow">
                                →
                            </span>

                        </div>


                        <div
                            className="activity-card clickable-activity-card"
                            onClick={() => navigate("/my-reviews")}
                        >

                            <span className="activity-icon">
                                ⭐
                            </span>

                            <h3>
                                {userReviews.length}
                            </h3>

                            <p>
                                My Reviews
                            </p>

                            <span className="activity-arrow">
                                →
                            </span>

                        </div>


                        <div
                            className="activity-card clickable-activity-card"
                            onClick={() => navigate("/study-spots")}
                        >

                            <span className="activity-icon">
                                📍
                            </span>

                            <h3>
                                Explore
                            </h3>

                            <p>
                                Study Spots
                            </p>

                            <span className="activity-arrow">
                                →
                            </span>

                        </div>

                    </div>

                </section>


                {/* ================= LOGOUT ================= */}

                <section className="profile-logout-section">

                    <div>

                        <h3>
                            Ready to leave?
                        </h3>

                        <p>
                            You can always come back and find your
                            perfect study space.
                        </p>

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
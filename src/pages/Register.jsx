import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

import { auth, db } from "../firebase";

import {
    doc,
    setDoc,
    serverTimestamp,
} from "firebase/firestore";


function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    function handleProfileImageChange(event) {

        const file = event.target.files[0];

        if (!file) {
            return;
        }

        // Only allow image files
        if (!file.type.startsWith("image/")) {

            setError("Please select a valid image file.");

            return;
        }

        // Maximum original file size: 2 MB
        if (file.size > 2 * 1024 * 1024) {

            setError(
                "Please choose an image smaller than 2 MB."
            );

            return;
        }

        setError("");

        setProfileImage(file);

        const reader = new FileReader();

        reader.onloadend = () => {

            setProfileImagePreview(
                reader.result
            );

        };

        reader.readAsDataURL(file);
    }

    function compressProfileImage(file) {

        return new Promise((resolve) => {

            const reader = new FileReader();

            reader.onload = (event) => {

                const image = new Image();

                image.onload = () => {

                    const canvas =
                        document.createElement("canvas");

                    const maxSize = 300;

                    let width = image.width;
                    let height = image.height;


                    if (width > height) {

                        if (width > maxSize) {

                            height =
                                height * (maxSize / width);

                            width = maxSize;

                        }

                    } else {

                        if (height > maxSize) {

                            width =
                                width * (maxSize / height);

                            height = maxSize;

                        }

                    }


                    canvas.width = width;
                    canvas.height = height;

                    const context =
                        canvas.getContext("2d");

                    context.drawImage(
                        image,
                        0,
                        0,
                        width,
                        height
                    );


                    const compressedImage =
                        canvas.toDataURL(
                            "image/jpeg",
                            0.7
                        );


                    resolve(compressedImage);

                };

                image.src = event.target.result;

            };

            reader.readAsDataURL(file);

        });

    }


    async function handleSubmit(event) {
        event.preventDefault();

        // Clear previous error
        setError("");

        // Prevent multiple clicks while registering
        setLoading(true);

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const newUser = userCredential.user;

            let profilePhoto = "";

            if (profileImage) {

                profilePhoto =
                    await compressProfileImage(
                        profileImage
                    );

            }


            // Save user's display name in Firebase Authentication
            await updateProfile(newUser, {
                displayName: name,
            });


            // Create user document in Firestore
            await setDoc(
                doc(db, "users", newUser.uid),
                {
                    // Basic Account Information
                    fullName: name,
                    email: email,

                    // Profile Picture
                    profilePhoto: profilePhoto,

                    // Personal Information
                    studentId: "",
                    phone: "",

                    // Academic Information
                    // User will fill these later from Edit Profile
                    university: "",
                    program: "",
                    branch: "",
                    semester: "",

                    // Study Preferences
                    noisePreference: "Quiet",
                    crowdPreference: "Less Crowded",
                    wifi: true,
                    outlets: true,

                    // Account Information
                    createdAt: serverTimestamp(),
                }
            );


            navigate("/study-spots");

        } catch (error) {

            console.error(error);

            if (
                error.code ===
                "auth/email-already-in-use"
            ) {

                setError(
                    "An account already exists with this email address. Please log in instead."
                );

            } else if (
                error.code ===
                "auth/invalid-email"
            ) {

                setError(
                    "Please enter a valid email address."
                );

            } else if (
                error.code ===
                "auth/weak-password"
            ) {

                setError(
                    "Your password is too weak. Please use at least 6 characters."
                );

            } else {

                setError(
                    "Unable to create your account. Please try again."
                );
            }

        } finally {

            setLoading(false);

        }
    }


    return (
        <main className="auth-page">

            <div className="auth-container">


                {/* LEFT SIDE */}

                <section className="auth-welcome">

                    <Link
                        to="/"
                        className="auth-logo"
                    >
                        StudySpot
                    </Link>


                    <div className="auth-welcome-content">

                        <p className="auth-tag">
                            JOIN STUDYSPOT
                        </p>

                        <h1>
                            Find your perfect
                            <br />
                            place to focus.
                        </h1>

                        <p>
                            Create your account and start discovering
                            the best study spaces around your campus.
                        </p>


                        <div className="auth-features">

                            <div>
                                Find the best study spots
                            </div>

                            <div>
                                Build your favorites collection
                            </div>

                            <div>
                                Help other students with reviews
                            </div>

                        </div>

                    </div>

                </section>


                {/* RIGHT SIDE */}

                <section className="auth-form-section">

                    <div className="auth-form-header">

                        <p className="small-heading">
                            GET STARTED
                        </p>

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Join StudySpot and find your ideal
                            study environment.
                        </p>

                    </div>


                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        {/* PROFILE PICTURE */}

                        <div className="form-group profile-picture-group">

                            <label htmlFor="profileImage">
                                Profile Picture
                                <span className="optional-text">
                                    Optional
                                </span>
                            </label>


                            <div className="register-profile-upload">

                                <div className="register-profile-preview">

                                    {profileImagePreview ? (

                                        <img
                                            src={profileImagePreview}
                                            alt="Profile preview"
                                        />

                                    ) : (

                                        <span>
                                            👤
                                        </span>

                                    )}

                                </div>


                                <div className="register-upload-content">

                                    <label
                                        htmlFor="profileImage"
                                        className="choose-photo-btn"
                                    >
                                        Choose Photo
                                    </label>

                                    <p>
                                        JPG, PNG or other image formats.
                                        Maximum size: 2 MB.
                                    </p>

                                </div>

                            </div>


                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                className="profile-image-input"
                            />

                        </div>


                        {/* FULL NAME */}

                        <div className="form-group">

                            <label htmlFor="name">
                                Full Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />

                        </div>


                        {/* ERROR MESSAGE */}

                        {error && (

                            <div className="auth-error">

                                <span>
                                    ⚠
                                </span>

                                <p>
                                    {error}
                                </p>

                            </div>

                        )}


                        {/* SUBMIT BUTTON */}

                        <button
                            type="submit"
                            className="auth-submit-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Account →"}

                        </button>

                    </form>


                    <p className="auth-switch">

                        Already have an account?

                        <Link to="/login">
                            Log in
                        </Link>

                    </p>

                </section>

            </div>

        </main>
    );
}


export default Register;
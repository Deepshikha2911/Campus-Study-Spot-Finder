import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await updateProfile(
                userCredential.user,
                {
                    displayName: name,
                }
            );

            console.log(
                "Account created:",
                userCredential.user
            );

            navigate("/study-spots");

        } catch (error) {
            console.error(error);

            alert(error.message);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-container">

                {/* LEFT SIDE */}
                <section className="auth-welcome">

                    <Link to="/" className="auth-logo">
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
                            <div>Find the best study spots</div>
                            <div>Build your favorites collection</div>
                            <div>Help other students with reviews</div>
                        </div>

                    </div>

                </section>

                {/* RIGHT SIDE */}
                <section className="auth-form-section">

                    <div className="auth-form-header">

                        <p className="small-heading">
                            GET STARTED
                        </p>

                        <h2>Create your account</h2>

                        <p>
                            Join StudySpot and find your ideal
                            study environment.
                        </p>

                    </div>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

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

                        <button
                            type="submit"
                            className="auth-submit-btn"
                        >
                            Create Account →
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
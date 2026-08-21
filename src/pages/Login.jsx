import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const userCredential =
                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            console.log(
                "Logged in:",
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
                            WELCOME BACK
                        </p>

                        <h1>
                            Your perfect study
                            <br />
                            spot is waiting.
                        </h1>

                        <p>
                            Log in to discover, save, and review the best
                            places to study around your campus.
                        </p>

                        <div className="auth-features">
                            <div>Discover study spaces</div>
                            <div>Save your favorite spots</div>
                            <div>Share your experience</div>
                        </div>

                    </div>

                </section>


                {/* RIGHT SIDE */}
                <section className="auth-form-section">

                    <div className="auth-form-header">

                        <p className="small-heading">
                            WELCOME BACK
                        </p>

                        <h2>Log in to your account</h2>

                        <p>
                            Enter your details to continue exploring
                            the best study spots.
                        </p>

                    </div>


                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

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
                                placeholder="Enter your password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                required
                            />

                        </div>


                        {/* FORGOT PASSWORD */}

                        <div className="forgot-password">

                            <Link to="/">
                                Forgot Password?
                            </Link>

                        </div>


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="auth-submit-btn"
                        >
                            Log In →
                        </button>

                    </form>


                    {/* SWITCH TO REGISTER */}

                    <p className="auth-switch">

                        Don't have an account?

                        <Link to="/register">
                            Create an account
                        </Link>

                    </p>

                </section>

            </div>
        </main>
    );
}

export default Login;
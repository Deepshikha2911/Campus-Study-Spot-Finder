import { useState } from "react";
import { Link } from "react-router-dom";

function AddStudySpot({ addStudySpot }) {

    const [spotName, setSpotName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [noise, setNoise] = useState("");
    const [wifi, setWifi] = useState("");
    const [outlets, setOutlets] = useState("");
    const [crowd, setCrowd] = useState("");

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);


    // ================= SUBMIT STUDY SPOT =================

    async function handleSubmit(event) {

        event.preventDefault();

        setSubmitting(true);


        const newStudySpot = {

            name: spotName.trim(),

            location: location.trim(),

            description: description.trim(),

            noise: noise,

            wifi: wifi,

            outlets: outlets,

            crowd: crowd,

            // Default emoji for user-added study spots
            emoji: "📚",

        };


        // Send data to App.jsx → Firestore
        const success =
            await addStudySpot(newStudySpot);


        if (success) {

            setSubmitted(true);

        } else {

            alert(
                "Unable to submit the study spot. Please try again."
            );

        }


        setSubmitting(false);

    }


    // ================= ADD ANOTHER SPOT =================

    function handleAddAnother() {

        setSpotName("");
        setLocation("");
        setDescription("");

        setNoise("");
        setWifi("");
        setOutlets("");
        setCrowd("");

        setSubmitted(false);

    }


    // ================= SUCCESS PAGE =================

    if (submitted) {

        return (

            <main className="add-spot-page">

                <div className="add-spot-container">

                    <div className="add-spot-success">

                        <div className="add-spot-success-icon">
                            ✓
                        </div>

                        <h1>
                            Study Spot Submitted!
                        </h1>

                        <p>
                            Thank you for helping other students discover
                            a new place to study.
                        </p>

                        <div className="add-spot-success-actions">

                            <Link
                                to="/study-spots"
                                className="view-spots-btn"
                            >
                                Explore Study Spots →
                            </Link>

                            <button
                                type="button"
                                className="add-another-btn"
                                onClick={handleAddAnother}
                            >
                                + Add Another Spot
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        );

    }


    return (

        <main className="add-spot-page">

            <div className="add-spot-container">


                {/* BACK BUTTON */}

                <Link
                    to="/study-spots"
                    className="back-btn"
                >
                    ← Back to Study Spots
                </Link>


                {/* PAGE HEADING */}

                <section className="add-spot-heading">

                    <p className="small-heading">
                        COMMUNITY CONTRIBUTION
                    </p>

                    <h1>
                        Add a Study Spot
                    </h1>

                    <p>
                        Know a great place to study on campus?
                        Share it with other students and help them
                        discover their next favorite study space.
                    </p>

                </section>


                {/* FORM */}

                <form
                    className="add-spot-form"
                    onSubmit={handleSubmit}
                >


                    {/* BASIC INFORMATION */}

                    <div className="add-spot-section">

                        <h2>
                            📍 Basic Information
                        </h2>

                        <p>
                            Tell us about the study spot.
                        </p>


                        <div className="form-group">

                            <label>
                                Study Spot Name
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Central Library Reading Room"
                                value={spotName}
                                onChange={(event) =>
                                    setSpotName(event.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                placeholder="Example: Block A, First Floor"
                                value={location}
                                onChange={(event) =>
                                    setLocation(event.target.value)
                                }
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Description
                            </label>

                            <textarea
                                rows="5"
                                placeholder="Describe the study spot and what makes it useful for students..."
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* STUDY ENVIRONMENT */}

                    <div className="add-spot-section">

                        <h2>
                            📚 Study Environment
                        </h2>

                        <p>
                            Help students understand what studying
                            here is like.
                        </p>


                        <div className="add-spot-grid">


                            {/* NOISE */}

                            <div className="form-group">

                                <label>
                                    🤫 Noise Level
                                </label>

                                <select
                                    value={noise}
                                    onChange={(event) =>
                                        setNoise(event.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Select noise level
                                    </option>

                                    <option>
                                        Very Quiet
                                    </option>

                                    <option>
                                        Quiet
                                    </option>

                                    <option>
                                        Moderate
                                    </option>

                                    <option>
                                        Noisy
                                    </option>

                                </select>

                            </div>


                            {/* WIFI */}

                            <div className="form-group">

                                <label>
                                    📶 Wi-Fi Quality
                                </label>

                                <select
                                    value={wifi}
                                    onChange={(event) =>
                                        setWifi(event.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Wi-Fi quality
                                    </option>

                                    <option>
                                        Excellent
                                    </option>

                                    <option>
                                        Good
                                    </option>

                                    <option>
                                        Average
                                    </option>

                                    <option>
                                        Poor
                                    </option>

                                </select>

                            </div>


                            {/* OUTLETS */}

                            <div className="form-group">

                                <label>
                                    🔌 Power Outlets
                                </label>

                                <select
                                    value={outlets}
                                    onChange={(event) =>
                                        setOutlets(event.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Select availability
                                    </option>

                                    <option>
                                        Easily Available
                                    </option>

                                    <option>
                                        Limited
                                    </option>

                                    <option>
                                        Not Available
                                    </option>

                                </select>

                            </div>


                            {/* CROWD */}

                            <div className="form-group">

                                <label>
                                    👥 Crowd Level
                                </label>

                                <select
                                    value={crowd}
                                    onChange={(event) =>
                                        setCrowd(event.target.value)
                                    }
                                    required
                                >

                                    <option value="">
                                        Select crowd level
                                    </option>

                                    <option>
                                        Low
                                    </option>

                                    <option>
                                        Moderate
                                    </option>

                                    <option>
                                        High
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="submit-spot-btn"
                        disabled={submitting}
                    >

                        {submitting
                            ? "Submitting..."
                            : "Submit Study Spot →"}

                    </button>

                </form>

            </div>

        </main>

    );

}

export default AddStudySpot;
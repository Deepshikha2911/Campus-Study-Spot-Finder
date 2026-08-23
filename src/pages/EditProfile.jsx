import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function EditProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        studentId: "",
        phone: "",
        university: "",
        program: "",
        branch: "",
        semester: "",
        noisePreference: "Quiet",
        crowdPreference: "Less Crowded",
        wifi: true,
        outlets: true,
    });

    const [loadingProfile, setLoadingProfile] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    // Fetch existing profile data from Firestore
    useEffect(() => {
        async function fetchProfile() {
            if (!user) {
                setLoadingProfile(false);
                return;
            }

            try {
                const userRef = doc(db, "users", user.uid);

                const userSnapshot = await getDoc(userRef);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();

                    setFormData({
                        fullName:
                            userData.fullName ||
                            user.displayName ||
                            "",

                        studentId:
                            userData.studentId || "",

                        phone:
                            userData.phone || "",

                        // No automatic default values
                        university:
                            userData.university || "",

                        program:
                            userData.program || "",

                        branch:
                            userData.branch || "",

                        semester:
                            userData.semester || "",

                        noisePreference:
                            userData.noisePreference ||
                            "Quiet",

                        crowdPreference:
                            userData.crowdPreference ||
                            "Less Crowded",

                        wifi:
                            userData.wifi ?? true,

                        outlets:
                            userData.outlets ?? true,
                    });
                } else {
                    // New user with no existing Firestore profile
                    setFormData({
                        fullName:
                            user.displayName || "",

                        studentId: "",
                        phone: "",
                        university: "",
                        program: "",
                        branch: "",
                        semester: "",
                        noisePreference: "Quiet",
                        crowdPreference: "Less Crowded",
                        wifi: true,
                        outlets: true,
                    });
                }

            } catch (error) {
                console.error(
                    "Error loading profile:",
                    error
                );

                setError(
                    "Unable to load your profile information."
                );

            } finally {
                setLoadingProfile(false);
            }
        }

        fetchProfile();

    }, [user]);


    // Handle form changes
    const handleChange = (event) => {
        const { name, value, type, checked } =
            event.target;

        const newValue =
            type === "checkbox"
                ? checked
                : value;

        setFormData((previousData) => ({
            ...previousData,
            [name]: newValue,
        }));


        // If an error is already visible,
        // validate again while the user corrects it
        if (validationErrors[name]) {
            validateField(name, newValue);
        }
    };

    const validateField = (name, value) => {
        let errorMessage = "";

        const trimmedValue = value.trim();

        switch (name) {
            case "fullName":
                if (!trimmedValue) {
                    errorMessage = "Full name is required.";
                } else if (trimmedValue.length < 3) {
                    errorMessage =
                        "Full name must contain at least 3 characters.";
                } else if (
                    !/^[A-Za-z\s]+$/.test(trimmedValue)
                ) {
                    errorMessage =
                        "Full name can contain only letters and spaces.";
                }
                break;


            case "studentId":
                if (
                    trimmedValue &&
                    trimmedValue.length < 5
                ) {
                    errorMessage =
                        "Student ID must contain at least 5 characters.";
                }
                break;


            case "phone":
                if (
                    trimmedValue &&
                    !/^[6-9]\d{9}$/.test(trimmedValue)
                ) {
                    errorMessage =
                        "Enter a valid 10-digit phone number.";
                }
                break;


            case "university":
                if (
                    trimmedValue &&
                    trimmedValue.length < 3
                ) {
                    errorMessage =
                        "University name must contain at least 3 characters.";
                }
                break;


            case "program":
                if (
                    trimmedValue &&
                    trimmedValue.length < 2
                ) {
                    errorMessage =
                        "Enter a valid program name.";
                }
                break;


            case "branch":
                if (
                    trimmedValue &&
                    trimmedValue.length < 3
                ) {
                    errorMessage =
                        "Enter a valid branch name.";
                }
                break;


            default:
                break;
        }

        setValidationErrors((previousErrors) => ({
            ...previousErrors,
            [name]: errorMessage,
        }));

        return errorMessage === "";
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;

        validateField(name, value);
    };

    const validateForm = () => {
        const errors = {};

        const fieldsToValidate = [
            "fullName",
            "studentId",
            "phone",
            "university",
            "program",
            "branch",
        ];

        fieldsToValidate.forEach((field) => {
            const value = formData[field].trim();

            if (field === "fullName") {
                if (!value) {
                    errors.fullName =
                        "Full name is required.";
                } else if (value.length < 3) {
                    errors.fullName =
                        "Full name must contain at least 3 characters.";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    errors.fullName =
                        "Full name can contain only letters and spaces.";
                }
            }

            if (
                field === "studentId" &&
                value &&
                value.length < 5
            ) {
                errors.studentId =
                    "Student ID must contain at least 5 characters.";
            }

            if (
                field === "phone" &&
                value &&
                !/^[6-9]\d{9}$/.test(value)
            ) {
                errors.phone =
                    "Enter a valid 10-digit phone number.";
            }

            if (
                field === "university" &&
                value &&
                value.length < 3
            ) {
                errors.university =
                    "University name must contain at least 3 characters.";
            }

            if (
                field === "program" &&
                value &&
                value.length < 2
            ) {
                errors.program =
                    "Enter a valid program name.";
            }

            if (
                field === "branch" &&
                value &&
                value.length < 3
            ) {
                errors.branch =
                    "Enter a valid branch name.";
            }
        });

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };


    // Save profile
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) return;

        // Validate all form fields
        if (!validateForm()) {
            return;
        }

        setSaving(true);
        setError("");

        try {
            // Update Firebase Authentication display name
            if (auth.currentUser) {
                await updateProfile(
                    auth.currentUser,
                    {
                        displayName:
                            formData.fullName,
                    }
                );
            }


            // Firestore document reference
            const userRef = doc(
                db,
                "users",
                user.uid
            );


            // Save or update profile in Firestore
            await setDoc(
                userRef,
                {
                    fullName:
                        formData.fullName,

                    email:
                        user.email,

                    studentId:
                        formData.studentId,

                    phone:
                        formData.phone,

                    university:
                        formData.university,

                    program:
                        formData.program,

                    branch:
                        formData.branch,

                    semester:
                        formData.semester,

                    noisePreference:
                        formData.noisePreference,

                    crowdPreference:
                        formData.crowdPreference,

                    wifi:
                        formData.wifi,

                    outlets:
                        formData.outlets,
                },
                {
                    merge: true,
                }
            );


            // Go back to profile
            navigate("/profile");

        } catch (error) {
            console.error(
                "Profile update error:",
                error
            );

            setError(
                "Unable to update your profile. Please try again."
            );

        } finally {
            setSaving(false);
        }
    };


    // Loading state
    if (loadingProfile) {
        return (
            <main className="edit-profile-page">
                <div className="edit-profile-container">
                    <p>Loading your profile...</p>
                </div>
            </main>
        );
    }


    return (
        <main className="edit-profile-page">

            <div className="edit-profile-container">

                {/* HEADING */}

                <div className="edit-profile-heading">

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        ← Back to Profile
                    </button>

                    <h1>Edit Your Profile</h1>

                    <p>
                        Keep your student information and
                        study preferences up to date.
                    </p>

                </div>


                {/* ERROR MESSAGE */}

                {error && (
                    <div className="auth-error">
                        <span>⚠</span>
                        <p>{error}</p>
                    </div>
                )}


                <form
                    className="edit-profile-form"
                    onSubmit={handleSubmit}
                >

                    {/* PERSONAL INFORMATION */}

                    <section className="edit-section">

                        <h2>
                            👤 Personal Information
                        </h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                        validationErrors.fullName
                                            ? "input-error"
                                            : ""
                                    }
                                    required
                                />

                                {validationErrors.fullName && (
                                    <span className="field-error">
                                        {validationErrors.fullName}
                                    </span>
                                )}

                            </div>


                            <div className="form-group">

                                <label>
                                    Student ID
                                </label>

                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your student ID"
                                    className={
                                        validationErrors.studentId
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {validationErrors.studentId && (
                                    <span className="field-error">
                                        {validationErrors.studentId}
                                    </span>
                                )}

                            </div>


                            <div className="form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter 10-digit phone number"
                                    maxLength="10"
                                    className={
                                        validationErrors.phone
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {validationErrors.phone && (
                                    <span className="field-error">
                                        {validationErrors.phone}
                                    </span>
                                )}

                            </div>

                        </div>

                    </section>


                    {/* ACADEMIC INFORMATION */}

                    <section className="edit-section">

                        <h2>
                            🎓 Academic Information
                        </h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    University
                                </label>

                                <input
                                    type="text"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter your university"
                                    className={
                                        validationErrors.university
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {validationErrors.university && (
                                    <span className="field-error">
                                        {validationErrors.university}
                                    </span>
                                )}

                            </div>


                            <div className="form-group">

                                <label>
                                    Program
                                </label>

                                <input
                                    type="text"
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Example: B.Tech"
                                    className={
                                        validationErrors.program
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {validationErrors.program && (
                                    <span className="field-error">
                                        {validationErrors.program}
                                    </span>
                                )}

                            </div>


                            <div className="form-group">

                                <label>
                                    Branch
                                </label>

                                <input
                                    type="text"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Example: Computer Science Engineering"
                                    className={
                                        validationErrors.branch
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {validationErrors.branch && (
                                    <span className="field-error">
                                        {validationErrors.branch}
                                    </span>
                                )}

                            </div>


                            <div className="form-group">

                                <label>
                                    Semester
                                </label>

                                <select
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select Semester
                                    </option>

                                    <option value="Semester 1">
                                        Semester 1
                                    </option>

                                    <option value="Semester 2">
                                        Semester 2
                                    </option>

                                    <option value="Semester 3">
                                        Semester 3
                                    </option>

                                    <option value="Semester 4">
                                        Semester 4
                                    </option>

                                    <option value="Semester 5">
                                        Semester 5
                                    </option>

                                    <option value="Semester 6">
                                        Semester 6
                                    </option>

                                    <option value="Semester 7">
                                        Semester 7
                                    </option>

                                    <option value="Semester 8">
                                        Semester 8
                                    </option>
                                </select>

                            </div>

                        </div>

                    </section>


                    {/* STUDY PREFERENCES */}

                    <section className="edit-section">

                        <h2>
                            📚 Study Preferences
                        </h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Preferred Noise Level
                                </label>

                                <select
                                    name="noisePreference"
                                    value={formData.noisePreference}
                                    onChange={handleChange}
                                >
                                    <option value="Quiet">
                                        Quiet
                                    </option>

                                    <option value="Moderate">
                                        Moderate
                                    </option>

                                    <option value="Lively">
                                        Lively
                                    </option>
                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Preferred Crowd Level
                                </label>

                                <select
                                    name="crowdPreference"
                                    value={formData.crowdPreference}
                                    onChange={handleChange}
                                >
                                    <option value="Less Crowded">
                                        Less Crowded
                                    </option>

                                    <option value="Moderately Busy">
                                        Moderately Busy
                                    </option>

                                    <option value="Busy">
                                        Busy
                                    </option>
                                </select>

                            </div>

                        </div>


                        <div className="checkbox-preferences">

                            <label className="checkbox-card">

                                <input
                                    type="checkbox"
                                    name="wifi"
                                    checked={formData.wifi}
                                    onChange={handleChange}
                                />

                                <span>
                                    📶 Strong Wi-Fi is important
                                </span>

                            </label>


                            <label className="checkbox-card">

                                <input
                                    type="checkbox"
                                    name="outlets"
                                    checked={formData.outlets}
                                    onChange={handleChange}
                                />

                                <span>
                                    🔌 Power outlets are important
                                </span>

                            </label>

                        </div>

                    </section>


                    {/* BUTTONS */}

                    <div className="edit-profile-actions">

                        <button
                            type="button"
                            className="cancel-edit-btn"
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-profile-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </main>
    );
}

export default EditProfile;
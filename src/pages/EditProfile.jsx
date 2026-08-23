import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function EditProfile({ studentInfo, setStudentInfo }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: user?.displayName || "",
        studentId: studentInfo.studentId || "",
        phone: studentInfo.phone || "",
        university: studentInfo.university || "",
        program: studentInfo.program || "",
        branch: studentInfo.branch || "",
        semester: studentInfo.semester || "",
        noisePreference: studentInfo.noisePreference || "Quiet",
        crowdPreference: studentInfo.crowdPreference || "Less Crowded",
        wifi: studentInfo.wifi ?? true,
        outlets: studentInfo.outlets ?? true,
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) return;

        setSaving(true);

        try {
            // Update Firebase Authentication display name
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: formData.fullName,
                });
            }

            // Update Firestore user document
            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
                fullName: formData.fullName,
                studentId: formData.studentId,
                phone: formData.phone,
                university: formData.university,
                program: formData.program,
                branch: formData.branch,
                semester: formData.semester,
                noisePreference: formData.noisePreference,
                crowdPreference: formData.crowdPreference,
                wifi: formData.wifi,
                outlets: formData.outlets,
            });

            // Update current React state
            setStudentInfo({
                studentId: formData.studentId,
                phone: formData.phone,
                university: formData.university,
                program: formData.program,
                branch: formData.branch,
                semester: formData.semester,
                noisePreference: formData.noisePreference,
                crowdPreference: formData.crowdPreference,
                wifi: formData.wifi,
                outlets: formData.outlets,
            });

            navigate("/profile");

        } catch (error) {
            console.error("Profile update error:", error);
            alert("Unable to update your profile. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className="edit-profile-page">
            <div className="edit-profile-container">

                <div className="edit-profile-heading">

                    <button
                        className="back-btn"
                        onClick={() => navigate("/profile")}
                    >
                        ← Back to Profile
                    </button>

                    <h1>Edit Your Profile</h1>

                    <p>
                        Keep your student information and study preferences up to date.
                    </p>

                </div>

                <form
                    className="edit-profile-form"
                    onSubmit={handleSubmit}
                >

                    {/* PERSONAL INFORMATION */}
                    <section className="edit-section">

                        <h2>👤 Personal Information</h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Full Name</label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Student ID</label>

                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    placeholder="Enter your student ID"
                                />

                            </div>

                            <div className="form-group">

                                <label>Email Address</label>

                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                />

                            </div>

                            <div className="form-group">

                                <label>Phone Number</label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number"
                                />

                            </div>

                        </div>

                    </section>


                    {/* ACADEMIC INFORMATION */}
                    <section className="edit-section">

                        <h2>🎓 Academic Information</h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>University</label>

                                <input
                                    type="text"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Program</label>

                                <input
                                    type="text"
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    placeholder="Example: B.Tech"
                                />

                            </div>

                            <div className="form-group">

                                <label>Branch</label>

                                <input
                                    type="text"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    placeholder="Example: Computer Science Engineering"
                                />

                            </div>

                            <div className="form-group">

                                <label>Semester</label>

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

                        <h2>📚 Study Preferences</h2>

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
                            onClick={() => navigate("/profile")}
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
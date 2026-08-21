import { Link } from "react-router-dom";

function StudySpotCard({ spot }) {
    return (
        <div className="study-spot-card">

            {/* Image / Visual Area */}
            <div className="spot-image">
                <span>{spot.emoji}</span>

                <div className="spot-rating">
                    ⭐ {spot.rating}
                </div>
            </div>


            {/* Card Content */}
            <div className="spot-content">

                <p className="spot-location">
                    📍 {spot.location}
                </p>

                <h2>{spot.name}</h2>

                <p className="spot-description">
                    {spot.description}
                </p>


                {/* Features */}
                <div className="spot-features">

                    <div className="spot-feature">
                        🤫
                        <span>{spot.noise}</span>
                    </div>

                    <div className="spot-feature">
                        📶
                        <span>{spot.wifi}</span>
                    </div>

                    <div className="spot-feature">
                        🔌
                        <span>{spot.outlets}</span>
                    </div>

                    <div className="spot-feature">
                        👥
                        <span>{spot.crowd}</span>
                    </div>

                </div>


                {/* Footer */}
                <div className="spot-card-footer">

                    <span>
                        ⭐ {spot.reviews} reviews
                    </span>

                    <Link
                        to={`/study-spots/${spot.id}`}
                        className="view-details-btn"
                    >
                        View Details →
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default StudySpotCard;
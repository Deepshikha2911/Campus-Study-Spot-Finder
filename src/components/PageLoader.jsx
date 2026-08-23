import { DotSpinner } from "ldrs/react";
import "ldrs/react/DotSpinner.css";

function PageLoader() {
    return (
        <div className="page-loader">
            <div className="loader-content">
                <div className="loader-logo">
                    🎓
                </div>

                <DotSpinner
                    size={45}
                    speed={0.9}
                    color="#3cb091"
                />

                <h2>Loading...</h2>

                <p>Finding your perfect study space</p>
            </div>
        </div>
    );
}

export default PageLoader;
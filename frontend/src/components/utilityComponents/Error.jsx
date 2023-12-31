import { FaExclamationTriangle } from "react-icons/fa";
import { PropTypes } from "prop-types";

export default function Error({ error }) {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <FaExclamationTriangle className="text-danger" size="5em" />
            <h1>Oops...</h1>
            <h4 className="lead">Something went wrong...</h4>
            <p className="lead">{error.message}</p>
            <p className="lead">Try Refreshing...</p>
        </div>
    );
}

Error.propTypes = {
    error: PropTypes.object,
};

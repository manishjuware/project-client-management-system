import { PropTypes } from "prop-types";
const Alert = ({ alert }) => {
    return (
        <div className="container mt-2" style={{ height: "70px" }}>
            {alert && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )}
        </div>
    );
};

Alert.propTypes = {
    alert: PropTypes.object,
};

export default Alert;

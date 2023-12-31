import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

const ProjectItem = ({ project }) => {
    const { _id, title, description, status, deadline } = project;

    function getColor(status) {
        if (status === "todo") return "info";
        else if (status === "in progress") return "warning";
        else if (status === "completed") return "success";
        else return "secondary";
    }

    return (
        <>
            <div className="card text-center mb-3">
                <div className={`card-header bg-${getColor(status)}`}>{status}</div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <Link to={`/project/${_id}`} className="btn btn-primary">
                        View
                    </Link>
                </div>
                <div className="card-footer text-body-secondary">Due: {deadline}</div>
            </div>
        </>
    );
};

ProjectItem.propTypes = {
    project: PropTypes.object,
};

export default ProjectItem;

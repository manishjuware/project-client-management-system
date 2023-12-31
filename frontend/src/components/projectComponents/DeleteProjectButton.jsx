import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { PropTypes } from "prop-types";
import projectsContext from "../../contexts/projects/projectsContext";
export default function DeleteProjectButton({ projectId }) {
    const navigate = useNavigate();

    const { deleteProject } = useContext(projectsContext);

    const handleClick = () => {
        deleteProject(projectId);
        navigate("/projects");
    };

    return (
        <div className="d-flex mt-5 ms-auto">
            <button className="btn btn-danger m-2" onClick={handleClick}>
                <FaTrash className="icon" /> Delete Project
            </button>
        </div>
    );
}

DeleteProjectButton.propTypes = {
    projectId: PropTypes.string.isRequired,
};

import { useState, useContext } from "react";
import { PropTypes } from "prop-types";
import projectsContext from "../../contexts/projects/projectsContext";

export default function EditProjectForm({ showAlert, project }) {
    const { updateProject } = useContext(projectsContext);

    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(project.status);
    const [deadline, setDeadline] = useState(project.deadline);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!title || !description || !status) {
            return showAlert("danger", "Please fill out all fields");
        }

        updateProject(project._id, title, description, status, deadline, project.client);
        showAlert("success", "Project details updated successfully");
        // getProject(project._id);
    };

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Deadline</label>
                    <input
                        type="date"
                        className="form-control"
                        id="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        id="status"
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="todo">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    );
}

EditProjectForm.propTypes = {
    showAlert: PropTypes.func,
    project: PropTypes.object,
};

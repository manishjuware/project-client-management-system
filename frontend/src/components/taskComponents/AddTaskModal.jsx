import { useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import tasksContext from "../../contexts/tasks/tasksContext";
import { PropTypes } from "prop-types";
export default function AddTaskModal({ projectId }) {
    const [title, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("select");

    const { addTask } = useContext(tasksContext);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }

        addTask(projectId, title, description, status);

        setName("");
        setDescription("");
        setStatus("select");
    };

    // if (error)  "Something Went Wrong";

    return (
        <>
            <>
                <button
                    type="button"
                    className="btn btn-primary "
                    data-bs-toggle="modal"
                    data-bs-target="#addTaskModal">
                    <div className="d-flex align-items-center">
                        <FaPlus className="icon" />
                        <div className="mx-2">Add Task</div>
                    </div>
                </button>

                <div
                    className="modal fade"
                    id="addTaskModal"
                    aria-labelledby="addTaskModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addTaskModalLabel">
                                    New Task
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            value={title}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            id="status"
                                            className="form-select"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}>
                                            <option value="select">Select Status</option>
                                            <option value="todo">Not Started</option>
                                            <option value="in progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

AddTaskModal.propTypes = {
    projectId: PropTypes.string,
};

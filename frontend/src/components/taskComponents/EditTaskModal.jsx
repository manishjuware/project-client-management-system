import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import tasksContext from "../../contexts/tasks/tasksContext";
import { PropTypes } from "prop-types";
export default function EditTaskModal({ showAlert, newTask, setNewTask }) {
    const { _id, title, description, status } = newTask;
    const { editTask } = useContext(tasksContext);

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || description === "" || status === "") {
            showAlert("Please fill in all fields");
            return;
        }

        editTask(_id, title, description, status);

        showAlert("success", "Task Details Updated Successfully");
    };

    const onChange = (event) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value });
    };

    // if (error)  "Something Went Wrong";

    return (
        <>
            <>
                <button
                    type="button"
                    className="btn btn-primary d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#editTaskModal">
                    <div className="d-flex align-items-center">
                        <FaPlus className="icon" />
                        <div className="mx-2">Edit Task</div>
                    </div>
                </button>

                <div
                    className="modal fade"
                    id="editTaskModal"
                    aria-labelledby="editTaskModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editTaskModalLabel">
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
                                            name="title"
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description"
                                            value={description}
                                            name="description"
                                            onChange={onChange}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            id="status"
                                            className="form-select"
                                            value={status}
                                            name="status"
                                            onChange={onChange}>
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

EditTaskModal.propTypes = {
    showAlert: PropTypes.func,
    newTask: PropTypes.object,
    setNewTask: PropTypes.func,
};

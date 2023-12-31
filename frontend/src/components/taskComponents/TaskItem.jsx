import PropTypes from "prop-types";
import { FaTrash, FaEdit } from "react-icons/fa";
import tasksContext from "../../contexts/tasks/tasksContext";
import { useContext } from "react";
const TaskItem = ({ task, setNewTask, showAlert }) => {
    const { _id, title, description, status } = task;
    const { deleteTask } = useContext(tasksContext);

    function handleDelete() {
        deleteTask(_id);
        showAlert("success", "Task Deleted Successfully");
    }

    //* Adding the data of selected task tobe edited to the "newTask" state in the tasks component
    const handleEdit = () => {
        setNewTask({
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
        });
    };

    function getColor(status) {
        if (status === "todo") return "info";
        else if (status === "in progress") return "warning";
        else if (status === "completed") return "success";
        else return "secondary";
    }

    return (
        <>
            <div className="card text-center mb-3">
                <div
                    className={`card-header bg-${getColor(status)} d-flex justify-content-between`}>
                    <h6 className="card-title">{title}</h6>
                    <div className="d-flex justify-content-between">
                        <i
                            className="btn mx-1"
                            onClick={handleEdit}
                            data-bs-toggle="modal"
                            data-bs-target="#editTaskModal">
                            <FaEdit />
                        </i>
                        <i className="btn mx-1" onClick={handleDelete}>
                            <FaTrash />
                        </i>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object,
    setNewTask: PropTypes.func,
    showAlert: PropTypes.func,
};

export default TaskItem;

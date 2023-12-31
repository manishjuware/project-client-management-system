import { useState, useEffect, useContext } from "react";
import Spinner from "../utilityComponents/Spinner";
import TaskItem from "./TaskItem";
import tasksContext from "../../contexts/tasks/tasksContext";
import AddTaskModal from "./AddTaskModal";
import Error from "../utilityComponents/Error";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import EditTaskModal from "./EditTaskModal";

const Tasks = ({ projectId, showAlert }) => {
    // getting the context from noteContext
    const { tasks, isLoading, error, getTasks } = useContext(tasksContext);
    let navigate = useNavigate();

    //* this state is used in the editTask modal
    const [newTask, setNewTask] = useState({ _id: "", title: "", description: "", status: "" });

    useEffect(() => {
        //* if user doesn't have the auth-token then redirect user to login screen
        if (localStorage.getItem("auth-token")) {
            getTasks(projectId);
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    if (error) return <Error error={error} />;

    return (
        <>
            <div className="container d-flex justify-content-between mb-5">
                <h1>Tasks</h1>
                <AddTaskModal projectId={projectId} />
                <EditTaskModal showAlert={showAlert} newTask={newTask} setNewTask={setNewTask} />
            </div>
            <div className="container ">
                <div className="row">
                    {isLoading ? (
                        <Spinner />
                    ) : tasks.length === 0 ? (
                        <p className="lead">No Tasks added</p>
                    ) : (
                        tasks.map((task) => {
                            return (
                                <div key={task._id} className="col-12">
                                    <TaskItem
                                        task={task}
                                        showAlert={showAlert}
                                        setNewTask={setNewTask}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

Tasks.propTypes = {
    projectId: PropTypes.string,
    showAlert: PropTypes.func,
};

export default Tasks;

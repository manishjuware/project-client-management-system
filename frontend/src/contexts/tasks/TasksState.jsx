import { useState } from "react";
import tasksContext from "./tasksContext";

const TasksState = (props) => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const host = import.meta.env.VITE_HOST_URL;

    //-> Get all tasks from the tasks collection
    const getTasks = async (projectId) => {
        //* Make API call to fetch all tasks
        try {
            setIsLoading(true);
            const response = await fetch(`${host}/tasks/fetchalltasks`, {
                method: "POST",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ projectId }),
            });

            const data = await response.json();

            setTasks(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };

    //-> Add a new task to the tasks collection
    const addTask = async (projectId, title, description, status) => {
        //* Make API call to add a task
        try {
            setError("");
            const response = await fetch(`${host}/tasks/addtask`, {
                method: "POST",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ projectId, title, description, status }),
            });

            const newTask = await response.json();

            setTasks([...tasks, newTask]);
        } catch (error) {
            setError(error);
        }
    };
    //-> Edit/Update a task in the tasks collection
    const editTask = async (id, title, description, status) => {
        try {
            setError("");
            //* Make API call to edit a task
            const response = await fetch(`${host}/tasks/updatetask/${id}`, {
                method: "PUT",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ title, description, status }),
            });

            const updatedTask = await response.json();

            const newTasks = tasks.filter((task) => {
                task._id !== id;
            });
            newTasks.push(updatedTask);
            setTasks(newTasks);
        } catch (error) {
            setError(error);
        }
    };
    //-> Delete a task from the tasks collection
    const deleteTask = async (id) => {
        //* Make API call to delete a task
        console.log("Before deletion", tasks);

        try {
            await fetch(`${host}/tasks/deletetask/${id}`, {
                method: "DELETE",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });
            const newTasks = tasks.filter((task) => task._id !== id);
            console.log("After deletion", newTasks);
            setTasks(newTasks);
        } catch (error) {
            setError(error);
        }
    };

    return (
        <tasksContext.Provider
            value={{ tasks, isLoading, error, addTask, getTasks, editTask, deleteTask }}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </tasksContext.Provider>
    );
};

export default TasksState;

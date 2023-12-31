import { useState } from "react";
import projectsContext from "./projectsContext";

const ProjectsState = (props) => {
    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const host = import.meta.env.VITE_HOST_URL;

    //-> Get all projects from the projects collection
    const getProjects = async () => {
        setIsLoading(true);
        setError("");
        //* Make API call to fetch all projects
        try {
            const response = await fetch(`${host}/projects/fetchallprojects`, {
                method: "GET",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });
            const data = await response.json();
            setProjects(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };

    //-> Get a project from the projects collection
    const getProject = async (id) => {
        //* Make API call to fetch a project
        try {
            setIsLoading(true);
            setError("");
            const response = await fetch(`${host}/projects/fetchproject`, {
                method: "POST",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();
            setProject(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };

    //-> Add a new project to the projects collection
    const addProject = async (title, description, status, deadline, client) => {
        setError("");
        //* Make API call to add a project
        try {
            const response = await fetch(`${host}/projects/addproject`, {
                method: "POST",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ title, description, status, deadline, client }),
            });
            const newProject = await response.json();
            setProjects([...projects, newProject]);
        } catch (error) {
            setError(error);
        }
    };
    //-> Edit/Update a project in the projects collection
    const updateProject = async (id, title, description, status, deadline, client) => {
        setError("");
        //* Make API call to edit a project
        try {
            const response = await fetch(`${host}/projects/updateproject/${id}`, {
                method: "PUT",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ title, description, status, deadline, client }),
            });

            const newProject = await response.json();

            setProject(newProject);
            projects.filter((project) => {
                if (project._id === id) {
                    project = newProject;
                }
            });
            setProjects([...projects]);
        } catch (error) {
            setError(error);
        }
    };
    //-> Delete a project from the projects collection
    const deleteProject = async (id) => {
        setError("");
        //* Make API call to delete a project
        try {
            await fetch(`${host}/projects/deleteproject/${id}`, {
                method: "DELETE",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });
        } catch (error) {
            setError(error);
        }
    };

    return (
        <projectsContext.Provider
            value={{
                projects,
                project,
                isLoading,
                error,
                addProject,
                getProject,
                getProjects,
                updateProject,
                deleteProject,
            }}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </projectsContext.Provider>
    );
};

export default ProjectsState;

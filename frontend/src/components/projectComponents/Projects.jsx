import { useEffect, useContext } from "react";
import Spinner from "../utilityComponents/Spinner";
import ProjectItem from "./ProjectItem";
import Error from "../utilityComponents/Error";
import projectsContext from "../../contexts/projects/projectsContext";
import { useNavigate } from "react-router-dom";
import AddProjectModal from "./AddProjectModal";

const Projects = () => {
    // getting the context from noteContext
    const { projects, getProjects, isLoading, error } = useContext(projectsContext);
    let navigate = useNavigate();

    useEffect(() => {
        //* if user doesn't have the auth-token then redirect user to login screen
        if (localStorage.getItem("auth-token")) {
            getProjects();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    if (error) return <Error error={error} />;

    return (
        <>
            <div className="container d-flex justify-content-between mb-5">
                <h1>Your Projects</h1>
                <AddProjectModal />
            </div>
            <div className="container ">
                <div className="row">
                    {isLoading ? (
                        <Spinner />
                    ) : projects.length === 0 ? (
                        <p className="lead">No Projects added</p>
                    ) : (
                        projects.map((project) => {
                            return (
                                <div key={project._id} className="col-sm-6 col-md-4">
                                    <ProjectItem project={project} />
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;

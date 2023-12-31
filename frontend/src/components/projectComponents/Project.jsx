import { Link, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import projectsContext from "../../contexts/projects/projectsContext";
import Spinner from "../utilityComponents/Spinner";
import Error from "../utilityComponents/Error";
import ClientInfo from "../clientComponents/ClientInfo";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectForm from "./EditProjectForm";
import Tasks from "../taskComponents/Tasks";
import { PropTypes } from "prop-types";
const Project = ({ showAlert }) => {
    const { project, getProject, isLoading, error } = useContext(projectsContext);

    const { id } = useParams();

    useEffect(() => {
        getProject(id);
        //eslint-disable-next-line
    }, []);

    const { _id, title, status, client } = project;

    function getColor(status) {
        if (status === "todo") return "info";
        else if (status === "in progress") return "warning";
        else if (status === "completed") return "success";
        else return "secondary";
    }

    if (error) return <Error error={error} />;
    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="row">
                    <div className="col">
                        <div className="card p-5 ">
                            <Link
                                to="/projects"
                                className="btn btn-light btn-sm w-25 d-inline ms-auto">
                                Back
                            </Link>
                            <h1>{title}</h1>
                            <div className="d-flex mt-3">
                                <h5 className="mx-2">Project Status: </h5>
                                <h5 className={`text-${getColor(status)}`}>{status}</h5>
                            </div>
                            <ClientInfo clientId={client} />
                            <EditProjectForm showAlert={showAlert} project={project} />
                            <DeleteProjectButton projectId={id} />
                        </div>
                    </div>
                    <div className="col-4">
                        <Tasks projectId={_id} showAlert={showAlert} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Project;

Project.propTypes = {
    showAlert: PropTypes.func,
};

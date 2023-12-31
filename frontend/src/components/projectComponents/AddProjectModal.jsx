import { useState, useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import projectsContext from "../../contexts/projects/projectsContext";
import clientsContext from "../../contexts/clients/clientsContext";

export default function AddProjectModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("select");
    const [deadline, setDeadline] = useState("");

    const { addProject } = useContext(projectsContext);

    // Get Clients for select
    const { clients, getClients } = useContext(clientsContext);
    useEffect(() => {
        getClients();
        // eslint-disable-next-line
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || description === "" || status === "") {
            return alert("Please fill in all fields");
        }

        addProject(name, description, status, deadline, clientId);

        setName("");
        setDescription("");
        setStatus("select");
        setClientId("");
        setDeadline("");
    };

    // if (error)  "Something Went Wrong";

    return (
        <>
            {/* {!loading && !error && ( */}
            <>
                <button
                    type="button"
                    className="btn btn-primary "
                    data-bs-toggle="modal"
                    data-bs-target="#addProjectModal">
                    <div className="d-flex align-items-center">
                        <FaPlus className="icon" />
                        <div className="mx-2">Add Project</div>
                    </div>
                </button>

                <div
                    className="modal fade"
                    id="addProjectModal"
                    aria-labelledby="addProjectModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addProjectModalLabel">
                                    New Project
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
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
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
                                        <label className="form-label">Client</label>
                                        <select
                                            id="clientId"
                                            className="form-select"
                                            value={clientId}
                                            onChange={(e) => setClientId(e.target.value)}>
                                            <option value="">Select Client</option>
                                            {clients.map((client) => (
                                                <option key={client._id} value={client._id}>
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        data-bs-dismiss="modal"
                                        className="btn btn-primary">
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            {/* )} */}
        </>
    );
}

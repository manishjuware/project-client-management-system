import { useContext } from "react";
import clientsContext from "../../contexts/clients/clientsContext";
import { PropTypes } from "prop-types";
export default function EditClientModal({ showAlert, newClient, setNewClient }) {
    const { editClient } = useContext(clientsContext);
    const { _id, name, email, phone } = newClient;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === "" || email === "" || phone === "") {
            showAlert("danger", "Please fill in all fields");
            return;
        }

        editClient(_id, name, email, phone);

        showAlert("success", "Client Details Updated Successfully");
    };
    //* keep the submit button disabled untill all fields are filled
    const toggleDisabled = () => {
        if (!(name.length >= 3 && phone.length === 10)) return true;
        return false;
    };

    const onChange = (event) => {
        setNewClient({ ...newClient, [event.target.name]: event.target.value });
    };
    return (
        <>
            {/* Button trigger modal */}

            <button
                className="btn btn-danger m-1 btn-sm d-none"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#editClientModal"></button>
            <div
                className="modal fade"
                id="editClientModal"
                aria-labelledby="editClientModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editClientModalLabel">
                                Edit Client Details
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                    />
                                    {name.length < 3 && name.length > 0 && (
                                        <sub className="text-danger">
                                            Name must be at least 3 characters
                                        </sub>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={onChange}
                                    />
                                    {phone.length !== 10 && phone.length > 0 && (
                                        <sub className="text-danger">
                                            Phone number must have only 10 digits
                                        </sub>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    data-bs-dismiss="modal"
                                    className="btn btn-secondary"
                                    disabled={toggleDisabled()}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

EditClientModal.propTypes = {
    showAlert: PropTypes.func,
    newClient: PropTypes.object,
    setNewClient: PropTypes.func,
};

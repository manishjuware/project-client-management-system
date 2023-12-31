import { useState, useContext } from "react";
import { FaUser, FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import clientsContext from "../../contexts/clients/clientsContext";
import { PropTypes } from "prop-types";
export default function AddClientModal({ showAlert }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const { addClient } = useContext(clientsContext);

    //* keep the submit button disabled untill all fields are filled
    const toggleDisabled = () => {
        if (!(name.length >= 3 && phone.length === 10)) return true;
        return false;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === "" || email === "" || phone === "") {
            showAlert("danger", "Please fill in all fields");
            return;
        }

        addClient(name, email, phone);

        setName("");
        setEmail("");
        setPhone("");
        showAlert("success", "Client details added Successfully");
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addClientModal">
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div className="mx-2">Add Client</div>
                </div>
            </button>

            <div
                className="modal fade"
                id="addClientModal"
                aria-labelledby="addClientModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addClientModalLabel">
                            <FaUser className="icon mx-2" />
                                Add Client
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
                                    <label className="form-label"><FaIdBadge className="icon mx-2" />Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {name.length < 3 && name.length > 0 && (
                                        <sub className="text-danger">
                                            Name must be at least 3 characters
                                        </sub>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><FaEnvelope className="icon mx-2" />Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label"><FaPhone className="icon mx-2" />Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        value={phone}
                                        required
                                        maxLength={10}
                                        onChange={(e) => setPhone(e.target.value)}
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
                                    Add
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

AddClientModal.propTypes = {
    showAlert: PropTypes.func,
};

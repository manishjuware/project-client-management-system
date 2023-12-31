import PropTypes from "prop-types";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useContext } from "react";
import clientsContext from "../../contexts/clients/clientsContext";
// import EditClientModal from "./EditClientModal";
const ClientRow = ({ client, setNewClient, showAlert }) => {
    const { _id, name, email, phone } = client;
    const { deleteClient } = useContext(clientsContext);

    function handleDelete() {
        deleteClient(_id);
        showAlert("success", "Client Deleted Successfully");
    }

    //* Adding the data of selected client tobe edited to the "newClient" state in the clients component
    const handleEdit = () => {
        setNewClient({
            _id: client._id,
            name: client.name,
            email: client.email,
            phone: client.phone,
        });
    };
    return (
        <>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button className="btn btn-danger m-1 btn-sm" onClick={handleDelete}>
                    <FaTrash />
                </button>
                <button
                    className="btn btn-danger m-1 btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#editClientModal"
                    onClick={handleEdit}>
                    <FaEdit />
                </button>
            </td>
        </>
    );
};

ClientRow.propTypes = {
    client: PropTypes.object,
    showAlert: PropTypes.func,
    setNewClient: PropTypes.func,
};

export default ClientRow;

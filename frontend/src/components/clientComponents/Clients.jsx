import { useEffect, useContext, useState } from "react";
import Spinner from "../utilityComponents/Spinner";
import ClientRow from "./ClientRow";
import Error from "../utilityComponents/Error";
import clientsContext from "../../contexts/clients/clientsContext";
import { useNavigate } from "react-router-dom";
import AddClientModal from "./AddClientModal";

import { PropTypes } from "prop-types";
import EditClientModal from "./EditClientModal";

const Clients = ({ showAlert }) => {
    // getting the context from noteContext
    const { clients, getClients, isLoading, error } = useContext(clientsContext);
    let navigate = useNavigate();

    //* this state is used in the editClient modal
    const [newClient, setNewClient] = useState({ _id: "", name: "", email: "", phone: "" });

    useEffect(() => {
        //* if user doesn't have the auth-token then redirect user to login screen
        if (localStorage.getItem("auth-token")) {
            getClients();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    if (error) return <Error error={error} />;

    let rowIndex = 1;

    return (
        <>
            <div className="container d-flex justify-content-between mb-3">
                <h1>Your Clients</h1>
                <AddClientModal showAlert={showAlert} />
                <EditClientModal
                    showAlert={showAlert}
                    newClient={newClient}
                    setNewClient={setNewClient}
                />
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => {
                                return (
                                    <tr key={client._id}>
                                        <th scope="row">{rowIndex++}</th>
                                        <ClientRow
                                            showAlert={showAlert}
                                            client={client}
                                            setNewClient={setNewClient}
                                        />
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

Clients.propTypes = {
    showAlert: PropTypes.func,
};

export default Clients;

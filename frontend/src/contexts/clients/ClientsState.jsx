import { useState } from "react";
import clientsContext from "./clientsContext";

const ClientsState = (props) => {
    // list of all clients
    const [clients, setClients] = useState([]);
    // single client info
    const [client, setClient] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const host = import.meta.env.VITE_HOST_URL;

    //-> Get all clients from the clients collection
    const getClients = async () => {
        //* Make API call to fetch all clients
        

        try {
            setIsLoading(true);
            setError("");
            const response = await fetch(`${host}/clients/fetchallclients`, {
                method: "GET",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });

            const data = await response.json();
            setClients(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };
    //-> Get a client from the clients collection
    const getClient = async (id) => {
        //* Make API call to fetch a client
        try {
            setIsLoading(true);
            setError("");
            const response = await fetch(`${host}/clients/fetchclient/${id}`, {
                method: "GET",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });

            const data = await response.json();
            setClient(data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
        }
    };

    //-> Add a new client to the clients collection
    const addClient = async (name, email, phone) => {
        //* Make API call to add a client
        try {
            const response = await fetch(`${host}/clients/addclient`, {
                method: "POST",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ name, email, phone }),
            });
            const newClient = await response.json();
            setClients([...clients, newClient]);
        } catch (error) {
            console.log(error);
        }
    };
    //-> Edit/Update a client in the clients collection
    const editClient = async (id, name, email, phone) => {
        //* Make API call to edit a client
        try {
            await fetch(`${host}/clients/updateclient/${id}`, {
                method: "PUT",
                mode: "cors",

                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify({ name, email, phone }),
            });

            const updatedClient = {};
            if (id) updatedClient._id = id;
            if (name) updatedClient.name = name;
            if (email) updatedClient.email = email;
            if (phone) updatedClient.phone = phone;

            const newClients = clients.filter((client) => client._id !== id);
            newClients.push(updatedClient);
            setClients(newClients);
        } catch (error) {
            console.log(error);
        }
    };
    //-> Delete a client from the clients collection
    const deleteClient = async (id) => {
        //* Make API call to delete a client        
        try {
            await fetch(`${host}/clients/deleteclient/${id}`, {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
            });
            const newClients = clients.filter((client) => client._id !== id);
            setClients(newClients);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <clientsContext.Provider
            value={{
                clients,
                client,
                isLoading,
                error,
                addClient,
                getClient,
                getClients,
                editClient,
                deleteClient,
            }}>
            {/* eslint-disable-next-line react/prop-types */}
            {props.children}
        </clientsContext.Provider>
    );
};

export default ClientsState;

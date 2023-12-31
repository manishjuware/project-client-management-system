import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import clientsContext from "../../contexts/clients/clientsContext";
import { useEffect, useContext } from "react";
import Spinner from "../utilityComponents/Spinner";
import Error from "../utilityComponents/Error";
import { PropTypes } from "prop-types";

export default function ClientInfo({ clientId }) {
    const { client, getClient, isLoading, error } = useContext(clientsContext);

    useEffect(() => {  
        if(clientId)
            getClient(clientId)
        //eslint-disable-next-line
    }, []);
    if (error) return <Error error={error} />;
    return (
        <>
            <h5 className="mt-5">Client Information</h5>
            {isLoading ? (
                <Spinner />
            ) : (
                <ul className="list-group">
                    <li className="list-group-item">
                        <FaIdBadge className="icon" /> {client?.name}
                    </li>
                    <li className="list-group-item">
                        <FaEnvelope className="icon" /> {client?.email}
                    </li>
                    <li className="list-group-item">
                        <FaPhone className="icon" /> {client?.phone}
                    </li>
                </ul>
            )}
        </>
    );
}

ClientInfo.propTypes = {
    clientId: PropTypes.string,
};

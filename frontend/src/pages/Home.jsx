import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    let navigate = useNavigate();
    useEffect(() => {
        //* if user doesn't have the auth-token then redirect user to login screen
        if (localStorage.getItem("auth-token")) {
            navigate("/projects");
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    return <div>Home</div>;
}

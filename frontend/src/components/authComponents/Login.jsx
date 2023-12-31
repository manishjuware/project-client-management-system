import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const Login = ({ showAlert }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const host = import.meta.env.VITE_HOST_URL;
    let navigate = useNavigate();

    const onChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    //* calling the login api
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${host}/auth/login`, {
            method: "POST",
            mode: "cors",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        if (json.success) {
            // if login is successful: store auth-token and redirect to "/"
            localStorage.setItem("auth-token", json.authToken);
            showAlert("success", "Login Successful");
            navigate("/");
        } else {
            showAlert("danger", "Invalid Credientials : Login Failed");
        }
    };

    return (
        <div
            className="container border border-2 rounded rounded-4 border-primary mt-5 p-5 "
            style={{ maxWidth: "570px" }}
        >
            <h2 className="text-center">Login</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={credentials.email}
                        name="email"
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={credentials.password}
                        name="password"
                        onChange={onChange}
                    />
                </div>
                <div className="container text-center">
                    <button type="submit" className="btn btn-primary px-3">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

Login.propTypes = {
    showAlert: PropTypes.func,
};

export default Login;

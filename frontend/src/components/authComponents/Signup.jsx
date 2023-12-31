import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";
const Signup = ({ showAlert }) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
    });
    const host = import.meta.env.VITE_HOST_URL;
    let navigate = useNavigate();

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    //* calling api with signup request to create a new user
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${host}/auth/signup`, {
            method: "POST",
            mode: "cors",

            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // if login is successful: store auth-token and redirect to "/"
            localStorage.setItem("auth-token", json.authToken);
            navigate("/projects");
            showAlert("success", "SignUp Successful");
        } else {
            showAlert("danger", json.error);
        }
    };

    return (
        <div
            className="container border border-2 rounded rounded-4 border-primary mt-5 p-5 "
            style={{ maxWidth: "570px" }}>
            <h2 className="text-center">Sign Up</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="name"
                        className="form-control"
                        id="name"
                        name="name"
                        value={credentials.name}
                        required
                        minLength={5}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        required
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
                        name="password"
                        value={credentials.password}
                        required
                        minLength={5}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name="cpassword"
                        value={credentials.cpassword}
                        required
                        minLength={5}
                        onChange={onChange}
                    />
                    {credentials.password !== credentials.cpassword && (
                        <span className="text-danger">Password didn&apos;t match</span>
                    )}
                </div>
                <div className="container text-center">
                    <button
                        disabled={
                            credentials.name.length < 5 ||
                            credentials.password.length < 5 ||
                            credentials.password !== credentials.cpassword
                        }
                        type="submit"
                        className="btn btn-primary">
                        SignUp
                    </button>
                </div>
            </form>
        </div>
    );
};

Signup.propTypes = {
    showAlert: PropTypes.func,
};

export default Signup;

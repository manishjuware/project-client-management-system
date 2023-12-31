import { NavLink, Link, useNavigate } from "react-router-dom";
import pmsLogo from "../../assets/logo.png";
export default function Navbar() {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        navigate("/login");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink
                        className="navbar-brand"
                        to={!localStorage.getItem("auth-token") ? "/" : "/projects"}>
                        <div className="d-flex">
                            <img src={pmsLogo} alt="pms logo" width={"40px"} height={"40px"} />
                            <h2 className="">PMS</h2>
                        </div>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!localStorage.getItem("auth-token") ? (
                                <>
                                    {/* <li className="nav-item">
                                        <NavLink
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/">
                                            Home
                                        </NavLink>
                                    </li> */}
                                    {/* <li className="nav-item">
                                        <NavLink className="nav-link" to="/about">
                                            About
                                        </NavLink>
                                    </li> */}
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/projects">
                                            Projects
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/clients">
                                            Clients
                                        </NavLink>
                                    </li>
                                    {/* <li className="nav-item">
                                        <NavLink className="nav-link" to="/tasks">
                                            Tasks
                                        </NavLink>
                                    </li> */}
                                </>
                            )}
                        </ul>
                        {!localStorage.getItem("auth-token") ? (
                            <form className="d-flex" role="search">
                                <Link className="btn btn-primary mx-1" to="/login" role="button">
                                    Login
                                </Link>
                                <Link className="btn btn-primary mx-1" to="/signup" role="button">
                                    Signup
                                </Link>
                            </form>
                        ) : (
                            <form className="d-flex" role="search">
                                <button className="btn btn-primary mx-1" onClick={handleLogout}>
                                    Logout
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

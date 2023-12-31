import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
// import Home from "./pages/Home";
// import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./components/authComponents/Login";
import Signup from "./components/authComponents/Signup";
import Navbar from "./components/utilityComponents/Navbar";
import Alert from "./components/utilityComponents/Alert";
import Projects from "./components/projectComponents/Projects";
import Clients from "./components/clientComponents/Clients";
import Project from "./components/projectComponents/Project";

function App() {
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({
            type: type,
            message: message,
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500);
    };
    return (
        <>
            <Router>
                <Navbar />
                <Alert alert={alert} />
                <div className="container">
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                localStorage.getItem("auth-token") ? (
                                    <Projects />
                                ) : (
                                    <Login />
                                )
                            }
                        />
                        {/* <Route exact path="/about" element={<About />} /> */}
                        <Route exact path="/projects" element={<Projects />} />
                        <Route
                            path="/project/:id"
                            element={<Project showAlert={showAlert} />}
                        />
                        <Route
                            exact
                            path="/clients"
                            element={<Clients showAlert={showAlert} />}
                        />
                        <Route
                            exact
                            path="/login"
                            element={<Login showAlert={showAlert} />}
                        />
                        <Route
                            exact
                            path="/signup"
                            element={<Signup showAlert={showAlert} />}
                        />
                        <Route exact path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;

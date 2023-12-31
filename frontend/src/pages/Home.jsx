import Projects from "../components/projectComponents/Projects";
import Login from "../components/authComponents/Login";

export default function Home() {
    return (
        <>
            {
                //* if user doesn't have the auth-token then redirect user to login screen
                localStorage.getItem("auth-token") ? <Projects /> : <Login />
            }
        </>
    );
}

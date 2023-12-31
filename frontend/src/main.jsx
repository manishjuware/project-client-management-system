import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import ProjectsState from "./contexts/projects/ProjectsState.jsx";
import ClientsState from "./contexts/clients/ClientsState.jsx";
import TasksState from "./contexts/tasks/TasksState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <TasksState>
            <ClientsState>
                <ProjectsState>
                    <App />
                </ProjectsState>
            </ClientsState>
        </TasksState>
    </React.StrictMode>
);

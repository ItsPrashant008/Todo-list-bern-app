import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Wallet } from "./components/Wallet";
import { CreateTask } from "./components/CreateTask";
import { UpdateTask } from "./components/UpdateTask";
import { DeleteTask } from "./components/DeleteTask";
import { ViewTasks } from "./components/ViewTasks";
import { ViewAllTasks } from "./components/ViewAllTasks";
import { ViewUserTasks } from "./components/ViewUserTasks";

function App() {
  const router = createBrowserRouter([
    // {path:"/", Element:<Wallet />}
    { path: "/", element: <Wallet /> },
    { path: "/nav-bar", element: <NavBar /> },
    { path: "/create-task", element: <CreateTask /> },
    { path: "/update-task", element: <UpdateTask /> },
    { path: "/delete-task", element: <DeleteTask /> },
    { path: "/view-tasks", element: <ViewTasks /> },
    { path: "/viewAll-tasks", element: <ViewAllTasks /> },
    { path: "/viewUser-tasks", element: <ViewUserTasks /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

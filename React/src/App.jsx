import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavBar } from "./components/pages/NavBar";
import { PageNotFound } from "./components/PageNotFound";
import { Wallet } from "./components/Wallet";
import { CreateTask } from "./components/pages/CreateTask";
import { UpdateTask } from "./components/pages/UpdateTask";
import { DeleteTask } from "./components/pages/DeleteTask";
import { ViewTasks } from "./components/pages/ViewTasks";
import { ViewAllTasks } from "./components/pages/ViewAllTasks";
import { ViewUserTasks } from "./components/pages/ViewUserTasks";

function App() {
  const router = createBrowserRouter([
    { path: "*", element: <PageNotFound /> },
    { path: "/", element: <Wallet /> },
    { path: "/nav-bar", element: <NavBar /> },
    { path: "/create-task", element: <CreateTask /> },
    { path: "/update-task/:id", element: <UpdateTask /> },
    { path: "/delete-task/:id", element: <DeleteTask /> },
    { path: "/view-tasks", element: <ViewTasks /> },
    { path: "/viewAll-tasks", element: <ViewAllTasks /> },
    { path: "/viewUser-tasks", element: <ViewUserTasks /> },
  ]);

  return (
    <>
      {/* Transaction Loader */}
      <div
        className="mainLoader loader loader-default "
        id="loaderVisibility"
        data-text="Loading...  Wait for Transaction to Complete!"></div>

      <RouterProvider router={router} />
    </>
  );
}

export default App;

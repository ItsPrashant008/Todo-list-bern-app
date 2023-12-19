import { useState } from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Wallet } from "./components/Wallet";
import { CreateTask } from "./components/CreateTask";
import { UpdateTask } from "./components/UpdateTask";
import { DeleteTask } from "./components/DeleteTask";
import { ViewTasks } from "./components/ViewTasks";
import { ViewAllTasks } from "./components/ViewAllTasks";
import { ViewUserTasks } from "./components/ViewUserTasks";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    // {path:"/", Element:<Wallet />}
    { path: "/", element: <Wallet /> },
    { path: "/navBar", element: <NavBar /> },
    { path: "/createTask", element: <CreateTask /> },
    { path: "/updateTask", element: <UpdateTask /> },
    { path: "/deleteTask", element: <DeleteTask /> },
    { path: "/viewTasks", element: <ViewTasks /> },
    { path: "/viewAllTasks", element: <ViewAllTasks /> },
    { path: "/viewUserTasks", element: <ViewUserTasks /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;

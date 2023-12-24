import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

import { useEffect, useState } from "react";

import { NodeApi } from "../apis/NodeApi";
import { NavBar } from "./NavBar";

export const ViewTasks = () => {
  const [task, setTask] = useState([[]]);
  const navigateTo = useNavigate();
  useEffect(() => {
    let address = localStorage.getItem("connectedAddress");
    if (!address) {
      swal(
        "Warning!",
        "Wallet not Connected, Connect Wallet First!",
        "warning"
      );
      navigateTo("/");
    }
  }, []);

  const viewTask = async (event) => {
    try {
      event.preventDefault();
      let taskId = document.querySelector("#taskId").value;
      const nodeapi = NodeApi();

      let result = await nodeapi.viewTasks(taskId);
      console.log("result", result);

      setTask(result);
    } catch {
      console.log("error in view task");
    }
  };

  return (
    <>
      <NavBar />
      <h1>View Tasks Component</h1>
      <form onSubmit={viewTask}>
        <input
          type="number"
          id="taskId"
          name="taskId"
          placeholder="Enter Task Id"
        />
        <input type="submit" value="Get Task" />
      </form>
    </>
  );
};

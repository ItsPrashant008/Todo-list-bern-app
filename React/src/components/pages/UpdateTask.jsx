import swal from "sweetalert";

import { useEffect, useState } from "react";

import { NodeApi } from "../apis/NodeApi";
import { NavBar } from "./NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { ContractMethods } from "../Web3Connection/ContractMethods";

export const UpdateTask = () => {
  const params = useParams();

  const [task, setTask] = useState([]);
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
    } else {
      viewTask(params.id);
    }
  }, []);

  const viewTask = async (id) => {
    try {
      const nodeapi = NodeApi();

      let result = await nodeapi.viewTasks(id);
      console.log("result", result);

      setTask(result);
    } catch {
      console.log("error in view task");
    }
  };

  const updateTask = async (event) => {
    // document.getElementById("loaderVisibility").classList.add("is-active");

    // try {
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let date = document.querySelector("#date").value;
    let completed = document.querySelector("#completedStatus").value === "true";

    var someDate = new Date(date);
    someDate = someDate.getTime() / 1000;

    const instance = await ContractMethods();
    const { status, message } = await instance.updateTask(
      params.id,
      name,
      someDate,
      completed
    );

    if (status) {
      swal("Sucess!", message, "success");
    } else {
      swal("Error!", message, "error");
    }
    // } catch (error) {
    //   console.log("Error in update Task", error);
    //   swal("Error!", "Something went wrong in Update Task!", "error");
    // }

    // document.getElementById("loaderVisibility").classList.remove("is-active");
  };

  return (
    <>
      <NavBar />
      <h3>Update Tasks Component</h3>
      <form onSubmit={updateTask}>
        <input
          type="text"
          id="name"
          name="name"
          value={task.name || ""}
          onChange={(e) => setTask({ name: e.target.value, date: task.date })}
          placeholder="Enter Task Name"
        />
        <br />
        <br />
        <input
          type="date"
          id="date"
          name="date"
          value={task.date ? task.date : ""}
          onChange={(e) => setTask({ name: task.name, date: e.target.value })}
          placeholder="Enter Task Date"
        />
        <br />
        <br />

        <select
          id="completedStatus"
          defaultValue={task.completed ? "true" : "false"}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <br />
        <br />

        <input type="submit" value="Update Task" />
      </form>
    </>
  );
};

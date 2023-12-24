import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

import { NavBar } from "./NavBar";

import { NodeApi } from "../apis/NodeApi";

export const ViewAllTasks = () => {
  const [task, setTask] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    let address = localStorage.getItem("connectedAddress");
    if (address) {
      viewAllTask();
    } else {
      swal(
        "Warning!",
        "Wallet not Connected, Connect Wallet First!",
        "warning"
      );
      navigateTo("/");
    }
  }, []);

  const viewAllTask = async () => {
    const nodeapi = NodeApi();
    console.log("nodeapi", await nodeapi.viewAllTasks());
    setTask(await nodeapi.viewAllTasks());
  };
  return (
    <>
      <NavBar />
      <h1>View All Tasks Component</h1>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <td>Task Id</td>
            <td>Task Name</td>
            <td>Task Date</td>
            <td>Task Owner</td>
            <td>Task Status</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>dd</td>
            <td>dd</td>
            <td>dd</td>
            <td>dd</td>
            <td>dd</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

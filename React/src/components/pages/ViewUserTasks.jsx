import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";
import { NodeApi } from "../apis/NodeApi";
import { NavBar } from "./NavBar";

export const ViewUserTasks = () => {
  const navigateTo = useNavigate();
  const [task, setTask] = useState([]);

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

  const viewUserTask = async (event) => {
    try {
      event.preventDefault();
      let userAddress = document.querySelector("#userAddress").value;
      const nodeapi = NodeApi();

      let result = await nodeapi.viewUserTasks(userAddress);
      console.log("result", result);
      setTask(result);
    } catch {
      console.log("error in view task");
    }
  };
  return (
    <>
      <NavBar />
      <br /> <br />
      <form onSubmit={viewUserTask}>
        <input
          type="text"
          id="userAddress"
          name="userAddress"
          placeholder="Enter Task Owner"
        />
        <input type="submit" value="Get User Task" />
      </form>
      <br /> <br />
      <h1>View User Tasks Component</h1>
    </>
  );
};

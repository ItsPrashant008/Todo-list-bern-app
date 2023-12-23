import React, { useState, useEffect } from "react";
import { ContractMethods } from "../Web3Connection/ContractMethods";
import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

export const DeleteTask = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    let address = localStorage.getItem("connectedAddress");
    if (address) {
      //
    } else {
      swal(
        "Warning!",
        "Wallet not Connected, Connect Wallet First!",
        "warning"
      );
      navigateTo("/");
    }
  }, []);

  const deleteTask = async () => {
    document.getElementById("loaderVisibility").classList.add("is-active");

    try {
      const instance = await ContractMethods();
      const { status, message } = await instance.deleteTask(1);

      if (status) {
        swal("Sucess!", message, "success");
      } else {
        swal("Error!", message, "error");
      }
    } catch {
      swal("Error!", "Something went wrong in Delete Task!", "error");
    }

    document.getElementById("loaderVisibility").classList.remove("is-active");
  };
  return (
    <>
      <button onClick={deleteTask}> Delete Task </button>
      <br /> <br />
      <Link to="/">Home</Link>
      <br /> <br />
      <Link to="/nav-bar">nav-bar</Link>
      <br /> <br />
      <Link to="/create-task">create-task</Link>
      <br /> <br />
      <Link to="/update-task">update-task</Link>
      <br /> <br />
      <Link to="/delete-task">delete-task</Link>
      <br /> <br />
      <Link to="/view-tasks">view-tasks</Link>
      <br /> <br />
      <Link to="/viewAll-tasks">viewAll-tasks</Link>
      <br /> <br />
      <Link to="/viewUser-tasks">viewUser-tasks</Link>
      <br /> <br />
      <h1>Delete Task Component</h1>
    </>
  );
};

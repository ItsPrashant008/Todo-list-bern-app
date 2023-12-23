import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContractMethods } from "../Web3Connection/ContractMethods";
import swal from "sweetalert";

export const CreateTask = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("connectedAddress")) {
      swal(
        "Warning!",
        "Wallet not Connected, Connect Wallet First!",
        "warning"
      );
      navigateTo("/");
    }
  }, []);

  const createTask = async () => {
    document.getElementById("loaderVisibility").classList.add("is-active");

    try {
      const instance = await ContractMethods();
      const { status, message } = await instance.createTask("name", 1734957571);

      if (status) {
        swal("Sucess!", message, "success");
      } else {
        swal("Error!", message, "error");
      }
    } catch {
      swal("Error!", "Something went wrong in Create Task!", "error");
    }

    document.getElementById("loaderVisibility").classList.remove("is-active");
  };

  return (
    <>
      <h1>Create Task Component</h1>
      <button onClick={createTask}> Creating Task </button>
      <br /> <br />
      <Link to="/">Home</Link>
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
    </>
  );
};

// export default CreateTask;

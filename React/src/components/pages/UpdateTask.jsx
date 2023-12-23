import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

import { ContractMethods } from "../Web3Connection/ContractMethods";

export const UpdateTask = () => {
  const navigateTo = useNavigate();

  let address;

  useEffect(() => {
    address = localStorage.getItem("connectedAddress");
    if (!address) {
      swal(
        "Warning!",
        "Wallet not Connected, Connect Wallet First!",
        "warning"
      );
      navigateTo("/");
    } else {
    }
  }, []);

  const updateTask = async () => {
    document.getElementById("loaderVisibility").classList.add("is-active");
    try {
      const instance = await ContractMethods();
      const { status, message } = await instance.updateTask(
        1,
        "name",
        1734957571,
        true
      );

      if (status) {
        swal("Sucess!", message, "success");
      } else {
        swal("Error!", message, "error");
      }
    } catch {
      swal("Error!", "Something went wrong in Update Task!", "error");
    }
    document.getElementById("loaderVisibility").classList.remove("is-active");
  };

  return (
    <>
      <button onClick={updateTask}> Update Task </button>
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
      <h1>Update Task Component</h1>
    </>
  );
};

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContractMethods } from "../Web3Connection/ContractMethods";
import swal from "sweetalert";

import { NavBar } from "./NavBar";

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

  const createTask = async (event) => {
    document.getElementById("loaderVisibility").classList.add("is-active");

    try {
      event.preventDefault();
      let name = document.querySelector("#name").value;
      let date = document.querySelector("#date").value;

      var someDate = new Date(date);
      someDate = someDate.getTime() / 1000;
      const instance = await ContractMethods();
      const { status, message } = await instance.createTask(name, someDate);

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
      <NavBar />
      <br /> <br />
      <h3>Create Task Component</h3>
      <form onSubmit={createTask}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Task Name"
        />
        <br />
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Enter Task Date"
        />
        <br />
        <input type="submit" value="Add Task" />
      </form>
    </>
  );
};

// export default CreateTask;

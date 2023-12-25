import React, { useState, useEffect } from "react";
import { ContractMethods } from "../Web3Connection/ContractMethods";
import { useNavigate, useParams } from "react-router-dom";

import swal from "sweetalert";

import { NavBar } from "./NavBar";

export const DeleteTask = () => {
  const params = useParams();

  const navigateTo = useNavigate();
  useEffect(() => {
    let address = localStorage.getItem("connectedAddress");
    if (!address) {
      swal(
        "Warning!",
        "Wallet not Connected, Connect Wallet First!",
        "warning",
      );
      navigateTo("/");
    } else {
      deleteTask(params.id);
    }
  }, []);

  const deleteTask = async () => {
    document.getElementById("loaderVisibility").classList.add("is-active");

    try {
      const instance = await ContractMethods();
      const { status, message } = await instance.deleteTask(params.id);

      if (status) {
        swal("Sucess!", message, "success");
      } else {
        swal("Error!", message, "error");
      }
    } catch {
      swal("Error!", "Something went wrong in Delete Task!", "error");
    }

    document.getElementById("loaderVisibility").classList.remove("is-active");

    navigateTo("/viewAll-tasks");
  };

  return (
    <>
      <NavBar />
      <br /> <br />
      <button onClick={deleteTask}> Delete Task </button>
      <br /> <br />
      <h1>Delete Task Component</h1>
    </>
  );
};

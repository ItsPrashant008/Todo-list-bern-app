import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

import axios from "axios";

import { useEffect, useState } from "react";

export const ViewTasks = () => {
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

  const getDetail = async (id) => {
    axios.get(`${process.env.BaseURL}/viewTasks/${id}`).then((response) => {
      console.log("response.data--->>> ", response.data);
    });
  };

  return (
    <>
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
      <h1>View Tasks Component</h1>
    </>
  );
};

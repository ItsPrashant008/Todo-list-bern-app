import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import swal from "sweetalert";

import axios from "axios";

export const ViewAllTasks = () => {
  const [data, setData] = useState([null]);
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

  const viewAllTask = async () => {
    axios.get(`${process.env.BaseURL}/viewAllTasks`).then((response) => {
      console.log("response.data--->>> ", response.data.data);
      setData(response.data.data);
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

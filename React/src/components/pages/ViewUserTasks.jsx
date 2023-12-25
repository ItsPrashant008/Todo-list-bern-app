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
      if (result == undefined) {
        swal("Error", "Invalid Wallet Address!", "error");
        return false;
      }
      console.log("result", result);
      setTask(result);
    } catch {
      console.log("error in view task");
    }
  };
  return (
    <>
      <NavBar />
      <h2>View User Tasks</h2>
      <form className=" gradient-custom" onSubmit={viewUserTask}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className=" text-white">
                <div className=" text-center">
                  <div className="mb-md-5">
                    <div className="form-outline form-white mb-4">
                      <input
                        className="form-control"
                        type="text"
                        id="userAddress"
                        name="userAddress"
                        placeholder="Enter User Wallet Address"
                        required
                      />
                    </div>
                    <div className="mb-md-5  ">
                      <button type="submit" className="btn btn-primary">
                        Get User Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <section className=" header text-center">
        <div className="container  text-white">
          <div className="row">
            <div className="col-lg-12">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Task Id</th>
                          <th scope="col">Name</th>
                          <th scope="col">Owner</th>
                          <th scope="col">Date</th>
                          <th scope="col">Task Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {task.length > 0 ? (
                          task.map((item, key) => (
                            <tr key={item.id}>
                              <th scope="row">{item.id}</th>
                              <td>{item.name} </td>
                              <td title={item.owner}>
                                {item.owner.substring(0, 7)}......
                                {item.owner.substring(36)}{" "}
                                <button
                                  onClick={() =>
                                    navigator.clipboard.writeText(
                                      `${item.owner}`
                                    )
                                  }>
                                  Copy
                                </button>
                              </td>
                              <td>{item.date}</td>
                              <td>
                                {item.completed ? "Completed" : "Not Completed"}
                              </td>
                              <td>
                                <ul className="list-inline m-0">
                                  <li className="list-inline-item">
                                    <button
                                      className="btn btn-success btn-sm rounded-0"
                                      type="button"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Edit">
                                      <Link
                                        className="nav-link"
                                        to={"/update-task/" + item.id}>
                                        <i className="fa fa-trash">Update</i>
                                      </Link>
                                    </button>
                                  </li>
                                  <li className="list-inline-item">
                                    <button
                                      className="btn btn-danger btn-sm rounded-0"
                                      type="button"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Delete">
                                      <Link
                                        className="nav-link"
                                        to={"/delete-task/" + item.id}>
                                        <i className="fa fa-trash">Delete</i>
                                      </Link>
                                    </button>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No Data Found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

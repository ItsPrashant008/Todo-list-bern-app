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
    let result = await nodeapi.viewAllTasks();
    setTask(result);
  };
  return (
    <>
      <NavBar />

      <h2>View All Tasks</h2>
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
                          task.map((item) => (
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
                                        <i className="fa fa-pencil"> Update</i>
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
                                        <i className="fa fa-trash"> Delete</i>
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

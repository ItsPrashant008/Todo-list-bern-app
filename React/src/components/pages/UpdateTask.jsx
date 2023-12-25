import swal from "sweetalert";

import { useEffect, useState } from "react";

import { NodeApi } from "../apis/NodeApi";
import { NavBar } from "./NavBar";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { ContractMethods } from "../Web3Connection/ContractMethods";

export const UpdateTask = () => {
  const params = useParams();

  const [task, setTask] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    let address = localStorage.getItem("connectedAddress");
    if (!address) {
      swal(
        "Warning!",
        "Wallet not Connected, Connect Wallet First!",
        "warning"
      );
      navigateTo("/");
    } else {
      viewTask(params.id);
    }
  }, []);

  const viewTask = async (id) => {
    try {
      const nodeapi = NodeApi();

      let result = await nodeapi.viewTasks(id);
      console.log("result", result);

      setTask(result);
    } catch {
      console.log("error in view task");
    }
  };

  const updateTask = async (event) => {
    document.getElementById("loaderVisibility").classList.add("is-active");

    try {
      event.preventDefault();
      let name = document.querySelector("#name").value;
      let date = document.querySelector("#date").value;
      let completed =
        document.querySelector("#completedStatus").value === "true";

      var someDate = new Date(date);
      someDate = someDate.getTime() / 1000;

      const instance = await ContractMethods();
      const { status, message } = await instance.updateTask(
        params.id,
        name,
        someDate,
        completed
      );

      if (status) {
        swal("Sucess!", message, "success");
        navigateTo("/view-tasks");
      } else {
        swal("Error!", message, "error");
      }
    } catch (error) {
      console.log("Error in update Task", error);
      swal("Error!", "Something went wrong in Update Task!", "error");
    }

    document.getElementById("loaderVisibility").classList.remove("is-active");
  };

  return (
    <>
      <NavBar />
      <h3>Update Tasks</h3>

      <form className=" gradient-custom" onSubmit={updateTask}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
              <div className=" text-white">
                <div className=" text-center">
                  <div className="mb-md-5">
                    <div className="form-outline form-white mb-4">
                      <input
                        className="form-control"
                        id="name"
                        name="name"
                        value={task.name || ""}
                        onChange={(e) =>
                          setTask({ name: e.target.value, date: task.date })
                        }
                        placeholder="Enter Task Name"
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        className="form-control"
                        type="date"
                        id="date"
                        name="date"
                        value={task.date ? task.date : ""}
                        onChange={(e) =>
                          setTask({ name: task.name, date: e.target.value })
                        }
                        placeholder="Enter Task Date"
                        required
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <select
                        className="form-control"
                        id="completedStatus"
                        defaultValue={task.completed ? "true" : "false"}>
                        <option value="true">Completed</option>
                        <option value="false">Not Completed</option>
                      </select>
                    </div>

                    <div className="mb-md-5  ">
                      <button type="submit" className="btn btn-primary">
                        Update Task
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

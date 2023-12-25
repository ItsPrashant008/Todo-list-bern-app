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
      let currentDate = new Date().getTime() / 1000;

      if (someDate >= currentDate) {
        const instance = await ContractMethods();
        const { status, message } = await instance.createTask(name, someDate);

        if (status) {
          swal("Sucess!", message, "success");
        } else {
          swal("Error!", message, "error");
        }
      } else {
        swal("Error!", "Task Time is Greater than Current Time!", "error");

        document
          .getElementById("loaderVisibility")
          .classList.remove("is-active");

        return false;
      }
    } catch {
      swal("Error!", "Something went wrong in Create Task!", "error");
    }

    document.getElementById("loaderVisibility").classList.remove("is-active");
  };

  return (
    <>
      <NavBar />

      <h3>Create Task</h3>

      <form className=" gradient-custom" onSubmit={createTask}>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-4">
              <div className=" text-white">
                <div className=" text-center">
                  <div className="mb-md-5">
                    <div className="form-outline form-white mb-4">
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        name="name"
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
                        placeholder="Enter Task Date"
                        required
                      />
                    </div>

                    <div className="mb-md-5  ">
                      <button type="submit" className="btn btn-primary">
                        Add Task
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

// export default CreateTask;

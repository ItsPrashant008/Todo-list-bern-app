import { ContractInstance } from "./Web3Index";
import { NodeApi } from "../apis/NodeApi";

export const ContractMethods = async () => {
  const contract = await ContractInstance();
  const nodeapi = NodeApi();

  const walletAddress = localStorage.getItem("connectedAddress");

  const createTask = async (name, dateTime) => {
    let createTask = await contract.methods
      .addTask(name, dateTime)
      .send({ from: walletAddress })
      .then(() => {
        return { status: true, message: "Created Task Sucessfully!" };
      })
      .catch((err) => {
        console.log("Create Task->>>>>>>>>>>", err);
        return { status: false, message: "Task not Create!" };
      });

    return { status: createTask.status, message: createTask.message };
  };

  const updateTask = async (taskId, name, dateTime, completed) => {
    let result = await nodeapi.viewTasks(taskId);
    let updateTask;

    if (result.owner.toLowerCase() == walletAddress.toLowerCase()) {
      updateTask = await contract.methods
        .updateTask(taskId, name, dateTime, completed)
        .send({ from: walletAddress })
        .then(() => {
          return { status: true, message: "Update Task Sucessfully!" };
        })
        .catch((err) => {
          console.log("Update Task->>>>>>>>>>>", err);
          return { status: false, message: "Task not Update!" };
        });
    } else {
      return { status: false, message: "You're not Owner of this Task!" };
    }

    return { status: updateTask.status, message: updateTask.message };
  };

  const deleteTask = async (taskId) => {
    let result = await nodeapi.viewTasks(taskId);
    let deleteTask;
    if (result.owner.toLowerCase() == walletAddress.toLowerCase()) {
      deleteTask = await contract.methods
        .deleteTask(taskId)
        .send({ from: walletAddress })
        .then(() => {
          return { status: true, message: "Delete Task Sucessfully!" };
        })
        .catch((err) => {
          console.log("Delete Task->>>>>>>>>>>", err);
          return { status: false, message: "Task not Delete!" };
        });
    } else {
      return { status: false, message: "You're not Owner of this Task!" };
    }

    return { status: deleteTask.status, message: deleteTask.message };
  };

  return {
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask,
  };
};

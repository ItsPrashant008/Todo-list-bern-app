require("dotenv").config();

const express = require("express");
const app = express();

// const cors = require("cors");

const {
  contract,
  viewTotalTasks,
  viewTasks,
  viewAllTasks,
  viewUserTasks,
} = require("./web3");

// app.use(cors);

app.post("/create-task", async (req, res) => {
  await contract.methods
    .addTask("Learn Rust Language", 1706014854)
    .send({ from: "0x9a93dfcca855d0ae111b2ad1c48a6f1a96832df8" });
});

app.get("/totalTasks", async (req, res) => {
  try {
    let totalTask = await viewTotalTasks();
    res.status(200).json({
      status: true,
      data: totalTask,
      message: "Data fetch Successfully!",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong!" });
    console.log("error--->>", error);
  }
});

app.get("/viewTasks/:taskId", async (req, res) => {
  try {
    let taskId = req.params.taskId;
    let tasks = await viewTasks(taskId);
    res
      .status(200)
      .json({ status: true, data: tasks, message: "Data fetch Successfully!" });
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong!" });
    console.log("error--->>", error);
  }
});

app.get("/viewAllTasks", async (req, res) => {
  try {
    let allTasks = await viewAllTasks();
    if (allTasks.length > 0) {
      res.status(200).json({
        status: true,
        data: allTasks,
        message: "Data fetch Successfully!",
      });
    } else {
      res.status(400).json({ status: true, message: "No Task Found!" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong!" });
    console.log("error--->>", error);
  }
});

app.get("/viewUserTasks/:address", async (req, res) => {
  try {
    let address = req.params.address;
    let userTasks = await viewUserTasks(address);
    if (userTasks.length > 0) {
      res.status(200).json({
        status: true,
        data: userTasks,
        message: "Data fetch Successfully!",
      });
    } else {
      res.status(400).json({ status: false, message: "No Task Found!" });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: "Something went wrong!" });
    console.log("error--->>", error);
  }
});

PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});


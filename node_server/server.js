require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const { viewTaks, viewAllTasks, viewUserTaks } = require("./web3");

app.use(cors);

viewAllTasks();

PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});

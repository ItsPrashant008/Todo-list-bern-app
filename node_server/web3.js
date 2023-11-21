const Abi = require("./ABI.json");
const { Web3 } = require("web3");

const web3 = new Web3(process.env.Alchemy_Api_Key);
const contract = new web3.eth.Contract(Abi, process.env.ContractAddress);

const ownerTasks = async (account) => {
  const task = await contract.methods.owmerTasks(account).call();
  console.log("viewUserTaks-->> ", task);
  return task;
};

const viewUserTaks = async (account) => {
  const task = await contract.methods.viewUserTasks(account).call();
  console.log("viewUserTaks-->> ", task);
  return task;
};

const viewTaks = async () => {
  const task = await contract.methods.tasks(1).call();
  console.log("viewTaks-->> ", task);
  return task;
};

const viewAllTasks = async () => {
  const task = await contract.methods.viewAllTasks().call();
  console.log("viewAllTasks-->> ", task);
  return task;
};

const viewUserTaks = async (account) => {
  const task = await contract.methods.viewUserTasks(account).call();
  console.log("viewUserTaks-->> ", task);
  return task;
};

module.exports = { viewTaks, viewAllTasks, viewUserTaks };

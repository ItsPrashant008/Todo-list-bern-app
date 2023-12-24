const Abi = require("./ABI.json");
const { Web3 } = require("web3");

const web3 = new Web3(process.env.Alchemy_Api_Key);
const contract = new web3.eth.Contract(Abi, process.env.ContractAddress);

const viewTotalTasks = async () => {
  const totalTask = await contract.methods.totalTask().call();
  return Number(totalTask);
};

const viewTasks = async (taskId) => {
  const task = await contract.methods.tasks(taskId).call();
  const { id, name, date, owner, completed } = task;
  let dateTime = Number(date)*1000;
  let tasks = {
    id: Number(id),
    name,
    date: new Date(dateTime).toLocaleDateString("sv"),
    owner,
    completed,
  };
  return tasks;
};

const viewAllTasks = async () => {
  const task = await contract.methods.viewAllTasks().call();

  let allTask = task.map(({ id, name, date, owner, completed }) => {

    let dateTime = Number(date)*1000;
    return { id: Number(id), name, date: new Date(dateTime).toLocaleDateString("sv"), owner, completed };
  });

  return allTask;
};

const viewUserTasks = async (account) => {
  const task = await contract.methods.viewUserTasks(account).call();

  let userTask = task.map(({ id, name, date, owner, completed }) => {
    let dateTime = Number(date)*1000;
    return { id: Number(id), name, date: new Date(dateTime).toLocaleDateString("sv"), owner, completed };
  });

  return userTask;
};

module.exports = {
  contract,
  viewTotalTasks,
  viewTasks,
  viewAllTasks,
  viewUserTasks,
};

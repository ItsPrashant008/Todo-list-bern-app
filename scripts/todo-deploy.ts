import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  //Deploy Todo Contract
  const Todo = await ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();

  await todo.deployTransaction.wait(5);

  console.log("Todo-list Contract Address-> ", todo.address);


  await hre.run("verify:verify", {
    address: todo.address,
    contract: "contracts/Todo.sol:Todo",
  });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Deploy error-> ", error);
    process.exit(1);
  });


// https://sepolia.etherscan.io/address/0x07E850e6D61014cc4e5401011bfA0B06dDfd2C63#code

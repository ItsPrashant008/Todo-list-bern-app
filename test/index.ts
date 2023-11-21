import { BigNumber } from "ethers";
import { ethers } from "hardhat";

export async function basicMethod() {

  let currentTime = BigNumber.from(Math.floor(new Date().getTime() / 1000)).add(
    20
  );

  // random address
  const [deployer, ...users] = await ethers.getSigners();

  // Deploy Token Contract
  const Todo = await ethers.getContractFactory("Todo");
  const todo = await Todo.deploy();

  return {
    currentTime,
    
    deployer,
    users,
    todo,
  };
}

// conver value into Big Number 1^18 or 1e18
function decimal(value: any) {
  const powValue = BigNumber.from("10").pow(18);
  return BigNumber.from(value).mul(powValue);
}
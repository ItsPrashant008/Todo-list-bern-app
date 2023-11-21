import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { basicMethod } from "./index";
import { BigNumber } from "ethers";
import { exit } from "process";

describe("Todo-List Contract", () => {
  it("Should check Total Tasks ", async () => {
    const { todo, currentTime } = await loadFixture(basicMethod);
    let date = currentTime;
    await todo.addTask("Learn Basic", date);
    await todo.addTask("Learn Advance Solidity", date);
    expect(await todo.totalTask()).to.be.equal(BigNumber.from(2));
  });

  it("Should check Add View Single Task", async () => {
    const { todo, currentTime, users } = await loadFixture(basicMethod);
    let date = currentTime;
    await todo.connect(users[1]).addTask("Learn Basic", date);
    await todo.connect(users[1]).addTask("Learn Advance Solidity", date);
    expect(await todo.tasks(1)).to.have.deep.members([BigNumber.from(1), "Learn Basic", BigNumber.from(date), users[1].address]);
    expect(await todo.tasks(2)).to.have.deep.members([BigNumber.from(2), "Learn Advance Solidity", BigNumber.from(date), users[1].address]);
  });

  it("Should check all tasks", async () => {
    const { todo, currentTime, users } = await loadFixture(basicMethod);
    let date = currentTime;

    await todo.connect(users[1]).addTask("Learn Basic", date);
    await todo.connect(users[1]).addTask("Learn Solidity", date);

    expect(await todo.viewAllTasks()).to.have.deep.members(
      [
        [BigNumber.from(1), "Learn Basic", BigNumber.from(date), users[1].address],
        [BigNumber.from(2), "Learn Solidity", BigNumber.from(date), users[1].address],
      ]);

  });

  it("Should check each user tasks", async () => {
    const { todo, currentTime, users } = await loadFixture(basicMethod);
    let date = currentTime;

    await todo.connect(users[1]).addTask("Learn Basic", date);
    await todo.connect(users[1]).addTask("Learn Advance Solidity", date);

    await todo.connect(users[2]).addTask("Learn React", date);
    await todo.connect(users[2]).addTask("Learn Node", date);

    await todo.connect(users[3]).addTask("Learn Php", date);
    await todo.connect(users[3]).addTask("Learn Javascript", date);


    expect(await todo.viewUserTasks(users[1].address)).to.have.deep.members([
      [BigNumber.from(1), "Learn Basic", BigNumber.from(date), users[1].address],
      [BigNumber.from(2), "Learn Advance Solidity", BigNumber.from(date), users[1].address]
    ]);

    expect(await todo.viewUserTasks(users[2].address)).to.have.deep.members([[
      BigNumber.from(3), "Learn React", BigNumber.from(date), users[2].address],
    [BigNumber.from(4), "Learn Node", BigNumber.from(date), users[2].address]
    ]);

    expect(await todo.viewUserTasks(users[3].address)).to.have.deep.members([
      [BigNumber.from(5), "Learn Php", BigNumber.from(date), users[3].address],
      [BigNumber.from(6), "Learn Javascript", BigNumber.from(date), users[3].address]
    ]);

  });

  it("Should check Update Task", async () => {
    const { todo, currentTime, users } = await loadFixture(basicMethod);
    let date = currentTime;
    await todo.connect(users[1]).addTask("Learn Basic", date);
    expect(await todo.tasks(1)).to.have.deep.members([BigNumber.from(1), "Learn Basic", BigNumber.from(date), users[1].address]);

    await todo.connect(users[1]).updateTask(1, "Learn Solidity", date);

    expect(await todo.tasks(1)).to.have.deep.members([BigNumber.from(1), "Learn Solidity", BigNumber.from(date), users[1].address]);
  });

  it("Should check delete Task", async () => {
    const { todo, currentTime, users } = await loadFixture(basicMethod);
    let date = currentTime;
    await todo.connect(users[1]).addTask("Learn Basic", date);
    await todo.connect(users[1]).addTask("Learn Advance Solidity", date);
    await todo.connect(users[1]).addTask("Learn Node", date);

    await todo.connect(users[1]).deleteTask(2);

    expect(await todo.tasks(2)).to.have.deep.members([BigNumber.from(0), "", BigNumber.from(0), "0x0000000000000000000000000000000000000000"]);

    expect(await todo.viewAllTasks()).to.have.deep.members(
      [
        [BigNumber.from(1), "Learn Basic", BigNumber.from(date), users[1].address],
        [BigNumber.from(3), "Learn Node", BigNumber.from(date), users[1].address],
      ]);

    expect(await todo.viewUserTasks(users[1].address)).to.have.deep.members([
      [BigNumber.from(1), "Learn Basic", BigNumber.from(date), users[1].address],
      [BigNumber.from(3), "Learn Node", BigNumber.from(date), users[1].address]
    ]);
  });


  it("Should check Revert Message", async () => {
    const { todo, currentTime, users } = await loadFixture(basicMethod);
    let date = currentTime;

    await todo.connect(users[1]).addTask("Learn Basic", date);
    expect(await todo.tasks(1)).to.have.deep.members([BigNumber.from(1), "Learn Basic", BigNumber.from(date), users[1].address]);

    await expect(todo.connect(users[1]).updateTask(2, "Learn Solidity", date)).to.revertedWith("Todo: Task Id Invalid!");
    await expect(todo.connect(users[2]).updateTask(1, "Learn Solidity", date)).to.revertedWith("Todo: Only can do this action!");

    await expect(todo.connect(users[1]).deleteTask(2)).to.revertedWith("Todo: Task Id Invalid!");
    await expect(todo.connect(users[2]).deleteTask(1)).to.revertedWith("Todo: Only can do this action!");

  });

});
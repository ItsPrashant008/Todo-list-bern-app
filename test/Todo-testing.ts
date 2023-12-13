import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { basicMethod, big } from "./index";
import { BigNumber } from "ethers";

describe("Todo-List Contract", () => {

  describe("Add Task Method", () => {
    it("Should check Total Tasks ", async () => {
      const { todo, currentTime } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.addTask("Learn Basic", date);
      await todo.addTask("Learn Advance Solidity", date);
      expect(await todo.totalTask()).to.be.equal(big(2));
    });

    it("Should check Add View Single Task", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).addTask("Learn Advance Solidity", date);

      expect(await todo.tasks(1)).to.have.deep.members([big(1), "Learn Basic", big(date), users[1].address]);
      expect(await todo.tasks(2)).to.have.deep.members([big(2), "Learn Advance Solidity", big(date), users[1].address]);
    });

    it("Should check each user Tasks", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;

      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).addTask("Learn Advance Solidity", date);

      await todo.connect(users[2]).addTask("Learn React", date);
      await todo.connect(users[2]).addTask("Learn Node", date);

      await todo.connect(users[3]).addTask("Learn Php", date);
      await todo.connect(users[3]).addTask("Learn Javascript", date);


      expect(await todo.viewUserTasks(users[1].address)).to.have.deep.members([
        [big(1), "Learn Basic", big(date), users[1].address],
        [big(2), "Learn Advance Solidity", big(date), users[1].address]
      ]);

      expect(await todo.viewUserTasks(users[2].address)).to.have.deep.members([[
        big(3), "Learn React", big(date), users[2].address],
      [big(4), "Learn Node", big(date), users[2].address]
      ]);

      expect(await todo.viewUserTasks(users[3].address)).to.have.deep.members([
        [big(5), "Learn Php", big(date), users[3].address],
        [big(6), "Learn Javascript", big(date), users[3].address]
      ]);

    });

    it("Should check all Tasks", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;

      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).addTask("Learn Solidity", date);

      expect(await todo.viewAllTasks()).to.have.deep.members(
        [
          [big(1), "Learn Basic", big(date), users[1].address],
          [big(2), "Learn Solidity", big(date), users[1].address],
        ]);

    });

    it("Should check Add Task Event", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;

      let event1 = await todo.connect(users[1]).addTask("Learn Basic", date);
      let event2 = await todo.connect(users[2]).addTask("Learn Solidity", date);

      expect(event1).to.emit(todo, "AddTask").withArgs([
        [big(1), "Learn Basic", big(date), users[1].address],
      ]);

      expect(event2).to.emit(todo, "AddTask").withArgs([
        [big(2), "Learn Solidity", big(date), users[2].address],
      ]);

    });
  });

  describe("Update Task Method", () => {
    it("Should check Update Task", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).updateTask(1, "Learn Solidity", date);

      expect(await todo.tasks(1)).to.have.deep.members([big(1), "Learn Solidity", big(date), users[1].address]);
    });

    it("Should check Event for Update Task", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.connect(users[1]).addTask("Learn Basic", date);

      let event = await todo.connect(users[1]).updateTask(1, "Learn Solidity", date);

      expect(event).to.emit(todo, "UpdateTask").withArgs([big(1), "Learn Solidity", big(date), users[1].address]);
    });

    describe("Revert Condition for Update Task Method", () => {
      it("Should check Invalid Task Id", async () => {
        const { todo, currentTime, users } = await loadFixture(basicMethod);
        let date = currentTime;
        await todo.connect(users[1]).addTask("Learn Basic", date);

        await expect(todo.connect(users[1]).updateTask(2, "Learn Solidity", date)).to.revertedWith("Todo: Task does not exist with the given ID!");
      });

      it("Should check Only Task Owner Update Own Task", async () => {
        const { todo, currentTime, users } = await loadFixture(basicMethod);
        let date = currentTime;
        await todo.connect(users[1]).addTask("Learn Basic", date);

        await expect(todo.connect(users[2]).deleteTask(1)).to.revertedWith("Todo: Only Task Owner can perform this action!");

      });
    });
  });

  describe("Delete Method", () => {
    it("Should check Delete Task Index Values", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).addTask("Learn Advance Solidity", date);
      await todo.connect(users[1]).addTask("Learn Node", date);

      await todo.connect(users[1]).deleteTask(2);

      expect(await todo.tasks(2)).to.have.deep.members([big(0), "", big(0), "0x0000000000000000000000000000000000000000"]);
    });

    it("Should check Delete Task for Single User", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).addTask("Learn Advance Solidity", date);
      await todo.connect(users[1]).addTask("Learn Node", date);

      await todo.connect(users[1]).deleteTask(2);

      expect(await todo.viewUserTasks(users[1].address)).to.have.deep.members([
        [big(1), "Learn Basic", big(date), users[1].address],
        [big(3), "Learn Node", big(date), users[1].address]
      ]);
    });

    it("Should check Delete Task for All Users", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).addTask("Learn Advance Solidity", date);
      await todo.connect(users[1]).addTask("Learn Node", date);

      await todo.connect(users[1]).deleteTask(2);

      expect(await todo.viewAllTasks()).to.have.deep.members(
        [
          [big(1), "Learn Basic", big(date), users[1].address],
          [big(3), "Learn Node", big(date), users[1].address],
        ]);


    });

    it("Should check Event for Delete Task Method", async () => {
      const { todo, currentTime, users } = await loadFixture(basicMethod);
      let date = currentTime;
      await todo.connect(users[1]).addTask("Learn Basic", date);
      await todo.connect(users[1]).addTask("Learn Advance Solidity", date);
      await todo.connect(users[1]).addTask("Learn Node", date);

      let event = await todo.connect(users[1]).deleteTask(2);

      expect(event).to.emit(todo, "DeleteTask").withArgs([big(2), users[1].address]);
    });

    describe("Revert Condition for Delete Method", () => {
      it("Should check Task Id Invalid", async () => {
        const { todo, currentTime, users } = await loadFixture(basicMethod);
        let date = currentTime;

        await todo.connect(users[1]).addTask("Learn Basic", date);
        await expect(todo.connect(users[1]).deleteTask(2)).to.revertedWith("Todo: Task does not exist with the given ID!");
      });

      it("Should check Only Task owner Delete Own Tasks", async () => {
        const { todo, currentTime, users } = await loadFixture(basicMethod);
        let date = currentTime;

        await todo.connect(users[1]).addTask("Learn Basic", date);
        await expect(todo.connect(users[2]).deleteTask(1)).to.revertedWith("Todo: Only Task Owner can perform this action!");
      });
    });
  });


});
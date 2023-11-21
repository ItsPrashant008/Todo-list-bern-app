// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

struct Task {
    uint id;
    string name;
    uint date;
    address owner;
}

contract Todo {
    uint public totalTask;
    mapping(uint => Task) public tasks;

    mapping(address => uint[]) private userTasks;

    modifier onlyOwner(uint taskId_) {
        require(taskId_ == tasks[taskId_].id, "Todo: Task Id Invalid!");
        require(
            msg.sender == tasks[taskId_].owner,
            "Todo: Only can do this action!"
        );
        _;
    }

    function addTask(string memory name, uint dateTime) external {
        totalTask++;
        tasks[totalTask] = Task(totalTask, name, dateTime, msg.sender);
        userTasks[msg.sender].push(totalTask);
    }

    function viewAllTasks() external view returns (Task[] memory) {
        Task[] memory result = new Task[](totalTask);

        uint count = 0;
        for (uint i = 1; i <= totalTask; ) {
            if (tasks[i].id > 0) {
                result[count] = Task(
                    tasks[i].id,
                    tasks[i].name,
                    tasks[i].date,
                    tasks[i].owner
                );

                unchecked {
                    count++;
                }
            }

            unchecked {
                i++;
            }
        }

        // Resize the array to remove empty slots
        assembly {
            mstore(result, count)
        }

        return result;
    }

    function viewUserTasks(
        address owner
    ) external view returns (Task[] memory) {
        Task[] memory result = new Task[](userTasks[owner].length);
        uint count = 0;

        for (uint i = 0; i < userTasks[owner].length; ) {
            uint taskId = userTasks[owner][i];
            if (tasks[taskId].owner == owner) {
                result[count] = Task(
                    tasks[taskId].id,
                    tasks[taskId].name,
                    tasks[taskId].date,
                    tasks[taskId].owner
                );

                unchecked {
                    count++;
                }
            }

            unchecked {
                i++;
            }
        }

        // Resize the array to remove empty slots
        assembly {
            mstore(result, count)
        }

        return result;
    }

    function updateTask(
        uint taskId,
        string memory name,
        uint dateTime
    ) external onlyOwner(taskId) {
        tasks[taskId] = Task(taskId, name, dateTime, msg.sender);
    }

    function deleteTask(uint taskId) external onlyOwner(taskId) {
        delete tasks[taskId];
    }
}

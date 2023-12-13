// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./ITodo.sol";

/**
 * @title Todo Contract
 * @dev A simple smart contract for managing tasks.
 */
contract Todo is ITodo {
    // Total number of tasks in the contract.
    uint public totalTask;

    // Mapping to store tasks with their unique IDs.
    mapping(uint => Task) public tasks;

    // Mapping to store user-specific tasks.
    mapping(address => uint[]) private userTasks;

    /**
     * @dev Modifier to ensure that the caller is the owner of the specified task.
     * @param taskId_ The ID of the task to check ownership.
     */
    modifier onlyOwner(uint taskId_) {
        // Check if the provided taskId matches the stored ID of the task.
        require(
            taskId_ == tasks[taskId_].id,
            "Todo: Task does not exist with the given ID!"
        );

        // Check if the caller (msg.sender) is the owner of the specified task.
        require(
            msg.sender == tasks[taskId_].owner,
            "Todo: Only Task Owner can perform this action!"
        );

        // Continue with the function execution if both conditions are met.
        _;
    }

    /**
     * @dev Adds a new task to the Todo contract.
     * @param name The name of the task.
     * @param dateTime The date and time associated with the task.
     */
    function addTask(string memory name, uint dateTime) external {
        // Increment the totalTask count to generate a new task ID.
        totalTask++;

        // Create a new Task struct with the incremented ID, task details, and the owner's address.
        tasks[totalTask] = Task(totalTask, name, dateTime, msg.sender);

        // Add the new task ID to the userTasks mapping for the owner.
        userTasks[msg.sender].push(totalTask);

        // Emit an event to log the addition of a new task.
        emit AddTask(totalTask, name, dateTime, msg.sender);
    }

    /**
     * @dev Retrieves an array containing tasks owned by a specific address.
     * @param owner The address of the task owner.
     * @return An array of Task structs representing tasks owned by the specified address.
     */
    function viewUserTasks(
        address owner
    ) external view returns (Task[] memory) {
        // Create a memory array to store tasks owned by the specified address.
        Task[] memory result = new Task[](userTasks[owner].length);

        // Initialize a counter to keep track of valid tasks for the specified owner.
        uint count = 0;

        // Iterate through each task ID in the userTasks array for the specified owner.
        for (uint i = 0; i < userTasks[owner].length; ) {
            // Get the task ID from the userTasks array.
            uint taskId = userTasks[owner][i];

            // Check if the task is owned by the specified address.
            if (tasks[taskId].owner == owner) {
                // Add a new Task struct to the result array with task details.
                result[count] = Task(
                    tasks[taskId].id,
                    tasks[taskId].name,
                    tasks[taskId].date,
                    tasks[taskId].owner
                );

                // Increment the counter to move to the next index in the result array.
                unchecked {
                    count++;
                }
            }

            // Move to the next task ID in the userTasks array.
            unchecked {
                i++;
            }
        }

        // Resize the array to remove empty slots using inline assembly.
        assembly {
            mstore(result, count)
        }

        // Return the array containing tasks owned by the specified address.
        return result;
    }

    /**
     * @dev Retrieves an array containing all tasks in the Todo contract.
     * @return An array of Task structs representing all tasks.
     */
    function viewAllTasks() external view returns (Task[] memory) {
        // Create a memory array to store all tasks with the maximum size of totalTask.
        Task[] memory result = new Task[](totalTask);

        // Initialize a counter to keep track of valid tasks.
        uint count = 0;

        // Iterate through each task ID starting from 1.
        for (uint i = 1; i <= totalTask; ) {
            // Check if the task ID is associated with a valid task.
            if (tasks[i].id > 0) {
                // Add a new Task struct to the result array with task details.
                result[count] = Task(
                    tasks[i].id,
                    tasks[i].name,
                    tasks[i].date,
                    tasks[i].owner
                );

                // Increment the counter to move to the next index in the result array.
                unchecked {
                    count++;
                }
            }

            // Move to the next task ID.
            unchecked {
                i++;
            }
        }

        // Resize the array to remove empty slots using inline assembly.
        assembly {
            mstore(result, count)
        }

        // Return the array containing all valid tasks.
        return result;
    }

    /**
     * @dev Updates the details of an existing task, including name and date.
     * @param taskId The unique identifier of the task to be updated.
     * @param name The new name for the task.
     * @param dateTime The new date for the task.
     */
    function updateTask(
        uint taskId,
        string memory name,
        uint dateTime
    ) external onlyOwner(taskId) {
        // Update the task details with the provided information.
        tasks[taskId] = Task(taskId, name, dateTime, msg.sender);

        // Emit an event to indicate the successful update of the task.
        emit UpdateTask(taskId, name, dateTime, msg.sender);
    }

    /**
     * @dev Deletes an existing task based on the provided task ID.
     * @param taskId The unique identifier of the task to be deleted.
     */
    function deleteTask(uint taskId) external onlyOwner(taskId) {
        // Delete the task from the tasks mapping using the provided task ID.
        delete tasks[taskId];

        // Emit an event to indicate the successful deletion of the task.
        emit DeleteTask(taskId, msg.sender);
    }
}

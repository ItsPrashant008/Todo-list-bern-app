// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
import "hardhat/console.sol";

interface ITodo {
    /**
     * @dev Struct representing a task, containing its unique identifier, name, date, and owner's address.
     */
    struct Task {
        uint id;
        string name;
        uint date;
        address owner;
        bool completed;
    }

    /**
     * @dev Event emitted when a new task is added.
     * @param taskId The unique identifier of the added task.
     * @param taskName The name of the added task.
     * @param dateTime The date of the added task.
     * @param taskOwner The address of the owner of the added task.
     */
    event AddTask(
        uint indexed taskId,
        string taskName,
        uint dateTime,
        address taskOwner
    );

    /**
     * @dev Event emitted when an existing task is updated.
     * @param taskId The unique identifier of the updated task.
     * @param taskNewName The new name of the updated task.
     * @param dateTime The new date of the updated task.
     * @param taskOwner The address of the owner of the updated task.
     * @param completed The task completed status(true for completed, false for not completed).

     */
    event UpdateTask(
        uint indexed taskId,
        string taskNewName,
        uint dateTime,
        address taskOwner,
        bool completed
    );

    /**
     * @dev Event emitted when a task is deleted.
     * @param taskId The unique identifier of the deleted task.
     * @param taskOwner The address of the owner of the deleted task.
     */
    event DeleteTask(uint indexed taskId, address taskOwner);

    /**
     * @dev Adds a new task to the Todo contract.
     * @param name The name of the task.
     * @param dateTime The date and time associated with the task.
     */
    function addTask(string memory name, uint dateTime) external;

    /**
     * @dev Retrieves an array containing tasks owned by a specific address.
     * @param owner The address of the task owner.
     * @return An array of Task structs representing tasks owned by the specified address.
     */
    function viewUserTasks(address owner) external view returns (Task[] memory);

    /**
     * @dev Retrieves an array containing all tasks in the Todo contract.
     * @return An array of Task structs representing all tasks.
     */
    function viewAllTasks() external view returns (Task[] memory);

    /**
     * @dev Updates the details of an existing task, including name and date.
     * @param taskId The unique identifier of the task to be updated.
     * @param name The new name for the task.
     * @param dateTime The new date for the task.
     * @param dateTime The new date for the task.
     */
    function updateTask(
        uint taskId,
        string memory name,
        uint dateTime,
        bool completed
    ) external;

    /**
     * @dev Deletes an existing task based on the provided task ID.
     * @param taskId The unique identifier of the task to be deleted.
     */
    function deleteTask(uint taskId) external;
}

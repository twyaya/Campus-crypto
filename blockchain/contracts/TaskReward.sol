// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./MyToken.sol";
import "./UserRole.sol";

contract TaskReward {
    struct Task {
        string description;
        uint256 reward;
        bool completed;
        address assignedTo;
    }

    MyToken public token;
    UserRole public userRole;
    address public admin;

    mapping(uint256 => Task) public tasks;
    uint256 public nextTaskId;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor(address tokenAddress, address userRoleAddress) {
        token = MyToken(tokenAddress);
        userRole = UserRole(userRoleAddress);
        admin = msg.sender;
    }

    function createTask(string memory desc, uint256 reward, address assignedTo) public onlyAdmin {
        tasks[nextTaskId] = Task(desc, reward, false, assignedTo);
        nextTaskId++;
    }

    function completeTask(uint256 taskId) public {
        Task storage task = tasks[taskId];
        require(msg.sender == task.assignedTo, "Not assigned user");
        require(!task.completed, "Task already completed");

        task.completed = true;
        token.transfer(task.assignedTo, task.reward * 10 ** token.decimals());
    }
}

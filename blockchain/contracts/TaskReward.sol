// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./MyToken.sol";
import "./UserRole.sol";

contract TaskReward {
    MyToken public token;
    UserRole public userRole;

    struct Task {
        string description;
        uint256 reward;
        uint256 maxClaims;
        uint256 currentClaims;
        address createdBy;
        mapping(address => bool) hasClaimed;
    }

    uint256 public nextTaskId;
    mapping(uint256 => Task) private _tasks;

    event TaskCreated(uint256 taskId, string description, uint256 reward, uint256 maxClaims);
    event TaskCompleted(uint256 taskId, address user);

    constructor(address tokenAddr, address roleAddr) {
        token = MyToken(tokenAddr);
        userRole = UserRole(roleAddr);
    }

    modifier onlyPublisher() {
        UserRole.Role r = userRole.getRole(msg.sender);
        require(r == UserRole.Role.Merchant || r == UserRole.Role.Admin, "Not allowed");
        _;
    }

    function createTask(string memory desc, uint256 reward, uint256 maxClaims) external onlyPublisher {
        Task storage t = _tasks[nextTaskId];
        t.description = desc;
        t.reward = reward;
        t.maxClaims = maxClaims;
        t.createdBy = msg.sender;

        emit TaskCreated(nextTaskId, desc, reward, maxClaims);
        nextTaskId++;
    }

    function completeTask(uint256 taskId) external {
        Task storage t = _tasks[taskId];

        // 僅限學生身份完成任務
        require(userRole.getRole(msg.sender) == UserRole.Role.Student, "Only students can complete tasks");

        require(t.currentClaims < t.maxClaims, "Max claims reached");
        require(!t.hasClaimed[msg.sender], "Already claimed");

        // 商家必須先 approve 給本合約
        bool success = token.transferFrom(t.createdBy, msg.sender, t.reward);
        require(success, "Token transfer failed");

        t.hasClaimed[msg.sender] = true;
        t.currentClaims++;

        emit TaskCompleted(taskId, msg.sender);
    }


    // 提供外部查詢任務資訊（不含 mapping）
    function getTask(uint256 taskId) external view returns (
        string memory description,
        uint256 reward,
        uint256 maxClaims,
        uint256 currentClaims,
        address createdBy
    ) {
        Task storage t = _tasks[taskId];
        return (t.description, t.reward, t.maxClaims, t.currentClaims, t.createdBy);
    }

    function hasUserClaimed(uint256 taskId, address user) external view returns (bool) {
        return _tasks[taskId].hasClaimed[user];
    }
}

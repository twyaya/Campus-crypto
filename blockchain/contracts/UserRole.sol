// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract UserRole {
    enum Role { None, Student, Merchant, Admin }

    mapping(address => Role) public roles;
    address public owner;

    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.Admin || msg.sender == owner, "Not admin");
        _;
    }

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Admin;
    }

    function setRole(address user, Role role) public onlyAdmin {
        roles[user] = role;
    }

    function getRole(address user) public view returns (Role) {
        return roles[user];
    }
}

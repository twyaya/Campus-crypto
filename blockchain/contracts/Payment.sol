// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./MyToken.sol";
import "./UserRole.sol";

contract Payment {
    MyToken public token;
    UserRole public userRole;

    constructor(address tokenAddress, address userRoleAddress) {
        token = MyToken(tokenAddress);
        userRole = UserRole(userRoleAddress);
    }

    function pay(address to, uint256 amount) public {
        require(
            userRole.getRole(msg.sender) == UserRole.Role.Student ||
            userRole.getRole(msg.sender) == UserRole.Role.Merchant,
            "Only student or merchant can pay"
        );
        token.transferFrom(msg.sender, to, amount * 10 ** token.decimals());
    }
}

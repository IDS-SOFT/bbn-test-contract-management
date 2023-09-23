//SPDX-License-Identifier:GPL-3.0

pragma solidity ^0.8.0;

contract ContractManagement {
    // Define variables
    address public owner;
    uint public contractValue;
    uint public deliveryDate;
    uint public penaltyRate;
    bool public isDelivered;

    // Define events
    event ContractCreated(address indexed user, uint indexed contractValue, uint indexed deliveryDate);
    event ContractCancelled(address indexed user);
    event ContractDelivered(address indexed user);

    // Constructor function
    constructor() {
        owner = msg.sender;
        contractValue = 0;
        deliveryDate = 0;
        penaltyRate = 0;
        isDelivered = false;
    }

    // Function to create contract
    function createContract(uint _contractValue, uint _deliveryDate, uint _penaltyRate) public {
        require(msg.sender == owner, "Only owner can create contract");
        require(!isDelivered, "Contract already delivered");
        contractValue = _contractValue;
        deliveryDate = _deliveryDate;
        penaltyRate = _penaltyRate;
        emit ContractCreated(msg.sender, contractValue, deliveryDate);
    }

    // Function to cancel contract
    function cancelContract() public {
        require(msg.sender == owner, "Only owner can cancel contract");
        require(!isDelivered, "Contract already delivered");
        contractValue = 0;
        deliveryDate = 0;
        penaltyRate = 0;
        emit ContractCancelled(msg.sender);
    }

    // Function to deliver contract
    function deliverContract() public {
        require(msg.sender == owner, "Only owner can deliver contract");
        require(!isDelivered, "Contract already delivered");
        if (block.timestamp > deliveryDate) {
            uint daysLate = (block.timestamp - deliveryDate) / 86400;
            uint penaltyAmount = contractValue * penaltyRate * daysLate / 100;
            payable(owner).transfer(penaltyAmount);
        }
        isDelivered = true;
        emit ContractDelivered(msg.sender);
    }
}

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract MessagePortal {
    uint256 totalmessages;
    uint256 private seed;
    //newWave
    event MessageSent(
        address indexed from,
        uint256 timestamp,
        string message,
        uint256 luckyNumber,
        bool hasWon
    );

    //Waver
    struct Message {
        address messageSender;
        string message;
        uint256 timestamp;
        uint256 luckyNumber;
        bool hasWon;
    }

    bool won = false;

    Message[] messages; //wavers

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("We have been constructed!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function sendMessage(string memory _message) public {
        lastWavedAt[msg.sender] = block.timestamp;

        totalmessages += 1;
        console.log("%s has sent a message!", msg.sender);

        seed = (block.difficulty + block.timestamp + seed) % 100;
        if (seed >= 50) {
            console.log("%s won!", msg.sender);
            console.log("the random number was", seed);
            won = true;

            uint256 prizeAmount = 0.001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
            messages.push(
                Message(msg.sender, _message, block.timestamp, seed, won)
            );
        } else {
            console.log("%s couldn't win", msg.sender);
            console.log("the random number was", seed);
            messages.push(
                Message(msg.sender, _message, block.timestamp, seed, won)
            );
        }

        emit MessageSent(msg.sender, block.timestamp, _message, seed, won);
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getTotalMessages() public view returns (uint256) {
        return totalmessages;
    }
}

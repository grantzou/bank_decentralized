// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    mapping(address => uint) private account_balance;
    mapping(address => uint[]) private blocks;

    function deposit_funds() public payable {
        account_balance[msg.sender] += msg.value;
        blocks[msg.sender].push(block.number);
    }

    function withdraw_funds(uint _funds) public {
        require(account_balance[msg.sender] >= _funds, "Insufficient Balance");
        account_balance[msg.sender] -= _funds;
        (bool success,) = msg.sender.call{value: _funds}("Amount Withdrawn");
        require(success, "Withdrawal failed");
        blocks[msg.sender].push(block.number);
    }

    function transfer_funds(address payable receiving_address, uint _funds) public {
        require(account_balance[msg.sender] >= _funds, "Insufficient Balance");
        account_balance[msg.sender] -= _funds;
        account_balance[receiving_address] += _funds;
        blocks[msg.sender].push(block.number);
        blocks[receiving_address].push(block.number);
        // (bool success,) = msg.sender.call{value: _funds}("Amount Transferred");
        // require(success, "Transfer failed");
    }

    function get_balance() public view returns(uint) {
        return account_balance[msg.sender];
    }

    function get_blocks() public view returns(uint[] memory) {
        return blocks[msg.sender];
    }
}
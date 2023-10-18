// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
/**
 * @project blockchain-mega-millions-lottery
 * @author moasadi on 10/11/2023 AD
 */
import "./models/User.sol";

contract Lottery {
    mapping(uint32 => UserData) public users;
    address owner;
    uint256 public ticketPrice = 0.01 ether;
    constructor(){owner = msg.sender;}
    function buyLotteryTicket() public payable {
        require(msg.value == ticketPrice, "You need to pay the exact price of the ticket");
        uint32 number = generateRandomCode();
        while (users[number].userAddress != address(0)) {
            number = generateRandomCode();
        }
        UserData memory user = UserData(msg.sender, number);
        users[number] = user;
    }

//    function generateRandomCode() private view returns (uint32) {
//        return uint32(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 1000000);
//    }

    function generateRandomCode() private view returns (uint32) {
        uint256 seed = uint256(block.timestamp);
//        uint32 randomValue = vrf.getRandomNumber(seed);
        uint32 randomValue = uint32(seed % 1000000);
        return randomValue;
    }
}

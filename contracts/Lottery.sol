// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lottery is Ownable{
    struct TokenData {
        address userAddress;
        uint32 token;
    }
    struct Winner {
        address userAddress;
        uint32 token;
        uint256 amount;
    }
    constructor(address _owner) Ownable(_owner) {
        // Constructor
    }
    mapping(uint32 => TokenData) public tokensByToken;
    mapping(address => uint32[]) public tokensByUser;
    uint32[] allTokens;
    uint256 chestBalance=0;
    uint32 index=0;
    uint256 public ticketPrice = 1e16; // 0.01 ether
    Winner public winnerToken;
    event WinnerAnnounced(Winner);

    function buyLotteryToken() external  payable {
        require(msg.value >= ticketPrice, "You need to pay 0.01 ETH for the ticket");

        uint32 number = generateRandomCode();
        while (tokensByToken[number].userAddress != address(0)) {
            number = generateRandomCode();
        }
        TokenData memory token = TokenData(msg.sender, number);
        tokensByToken[number] = token;
        tokensByUser[msg.sender].push(number);
        allTokens.push(number);
        index+=1;
        chestBalance+=msg.value;
    }

    function listMyTokens() public view returns (uint32[] memory) {
        return tokensByUser[msg.sender];
    }

    function getChestBalance()public view returns (uint256){
        return chestBalance;
    }

    function generateRandomCode() private view returns (uint32) {
        uint256 seed = uint256(block.timestamp);
        uint32 randomValue = uint32(seed % 1000000);
        return randomValue;
    }
    function runGame() public onlyOwner returns (Winner memory) {
        require(chestBalance > 0, "The chest is empty. No game to run.");

        uint32 winnerIndex = uint32(random(index));
        TokenData memory WinnerCondidaite = tokensByToken[allTokens[winnerIndex]];
        winnerToken = Winner(WinnerCondidaite.userAddress, WinnerCondidaite.token, chestBalance);
        emit WinnerAnnounced(winnerToken);
        payable(WinnerCondidaite.userAddress).transfer(chestBalance);
        chestBalance = 0;
        return winnerToken;
    }

    function getWinner()public view returns (Winner memory){
        return winnerToken;
    }
    function random(uint maxNumber) public view returns (uint256 number) {
        return uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.number))) % maxNumber;
    }
}

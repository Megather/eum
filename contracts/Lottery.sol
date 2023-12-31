// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address public owner;
    mapping(uint32 => TokenData) public tokensByToken;
    mapping(address => uint32[]) public tokensByUser;
    uint32[] allTokens;
    uint256 chestBalance = 0;
    uint32 index = 0;
    uint256 public ticketPrice = 1e15; // 0.01 ETH
    Winner public winnerToken;
    event WinnerAnnounced(Winner);

    struct TokenData {
        address userAddress;
        uint32 token;
    }
    struct Winner {
        address userAddress;
        uint32 token;
        uint256 amount;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function."
        );
        _;
    }

    function getOwner() public view onlyOwner returns (address) {
        return owner;
    }

    function buyLotteryToken() external payable {
        require(
            msg.value == ticketPrice,
            "You need to pay 0.01 ETH for the ticket"
        );

        uint32 number =generateRandomCode();
        while (tokensByToken[number].userAddress != address(0)) {
            number = generateRandomCode();
        }
        TokenData memory token = TokenData(msg.sender, number);
        tokensByToken[number] = token;
        tokensByUser[msg.sender].push(number);
        allTokens.push(number);
        index += 1;
        chestBalance =chestBalance+msg.value;
    }

    function listMyTokens() public view returns (uint32[] memory) {
        return tokensByUser[msg.sender];
    }

    function getChestBalance() public view returns (uint256) {
        return chestBalance;
    }

    function generateRandomCode() internal view returns (uint32) {
        uint32 randomNumber;
        if (block.timestamp % 2 == 0) {
            randomNumber = uint32(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            block.coinbase,
                            block.timestamp,
                            block.number
                        )
                    )
                ) % 1000000000
            );
        } else {
            randomNumber = uint32(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            blockhash(block.number - 1),
                            block.timestamp
                        )
                    )
                ) % 1000000000
            );
        }
        return randomNumber;
    }

    function runGame() public onlyOwner returns (Winner memory) {
        require(chestBalance > 0, "The chest is empty. No game to run.");

        uint32 winnerIndex = uint32(random(index));
        TokenData memory WinnerCondidaite = tokensByToken[
            allTokens[winnerIndex]
        ];
        winnerToken = Winner(
            WinnerCondidaite.userAddress,
            WinnerCondidaite.token,
            chestBalance
        );
        emit WinnerAnnounced(winnerToken);
        payable(WinnerCondidaite.userAddress).transfer(chestBalance);
        chestBalance = 0;
        return winnerToken;
    }

    function getWinner() public view returns (Winner memory) {
        return winnerToken;
    }

    function random(uint maxNumber) public view returns (uint256 number) {
        return
            uint(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, block.number)
                )
            ) % maxNumber;
    }
}

const Lottery = artifacts.require("Lottery.sol");

contract("Lottery", (accounts) => {
    it("should allow purchasing a lottery ticket", async () => {
        const instance = await Lottery.deployed();
        const ticketPrice = web3.utils.toWei("0.01", "ether");
        console.log(ticketPrice)
        try {
            const result = await instance.buyLotteryTicket({from: accounts[0] });
            console.log("Transaction receipt:", result);
        } catch (error) {
            throw error;
        }
    });
});

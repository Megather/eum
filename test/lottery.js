const Lottery = artifacts.require("Lottery.sol");

contract("Lottery", (accounts) => {
    it("should allow purchasing a lottery ticket", async () => {
        const instance = await Lottery.deployed(accounts[0]);
        // const ticketPrice = web3.utils.toWei("0.01", "ether");
        try {
            const result = await instance.buyLotteryToken({from: accounts[0] , value: web3.utils.toWei("0.01", "ether")});
            console.log("Transaction receipt:", result);
        } catch (error) {
            throw error;
        }
    });
});

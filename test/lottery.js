const Lottery = artifacts.require("Lottery.sol");

contract("Lottery", (accounts) => {
    it("should allow purchasing a lottery ticket", async () => {
        const instance = await Lottery.deployed();
        const ticketPrice = web3.utils.toWei("0.01", "ether");
        try {
            const result = await instance.buyLotteryToken({from: accounts[1], value: ticketPrice});
            const data=await instance.listMyTokens({from: accounts[1]});
            console.log(data)
            
        } catch (error) {
            console.log("Error: ", error.message);
            throw error;
        }
    });
});
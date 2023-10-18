const Lottery = artifacts.require("Lottery.sol");
const contractABI = Lottery.abi;
console.log(contractABI);
module.exports = function(deployer) {
    deployer.deploy(Lottery);
};
const Lottery = artifacts.require("Lottery");
module.exports = function(deployer,network,accounts) {
    deployer.deploy(Lottery);
};
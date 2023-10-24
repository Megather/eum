const Lottery = artifacts.require("Lottery");
module.exports = function(deployer,network,accounts) {
    deployer.deploy(Lottery,accounts[0])
        .then(() => Lottery.deployed())
        .then(instance => console.log("Migrations deployed at address: ", instance.address))
        .catch(error => console.error("Error deploying Migrations contract: ", error));
};
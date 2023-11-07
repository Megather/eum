const Lottery = artifacts.require("Lottery");

module.exports = function (deployer) {
    deployer.deploy(Lottery)
        .then(() => Lottery.deployed())
        .then(instance => console.log("Migrations deployed at address: ", instance.address))
        .catch(error => console.error("Error deploying Migrations contract: ", error));
};
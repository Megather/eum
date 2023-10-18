const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
    deployer.deploy(Migrations)
        .then(() => Migrations.deployed())
        .then(instance => console.log("Migrations deployed at address: ", instance.address))
        .catch(error => console.error("Error deploying Migrations contract: ", error));
};
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

const toast = document.getElementById('toast');
const Web3 = require('web3');
let web3 = null;
let account = null;
const LotteryContract = require('../build/contracts/Lottery.json'); // comment after deploying
const contractABI = LotteryContract?.abi; // comment after deploying
// const contractABI =require("./abi.json"); // uncomment after deploying

const contractAddress = '0x85DaC6c4A13f9b68AaFf9640D7CeEbB607e5472F59010576F3aCCF43Be5902fF'; // change after deploying

//click handlers
document.getElementById('connect-wallet').addEventListener('click', connectToWallet);


function connectToWallet() {
    console.log('Connecting to wallet...')
    if (typeof window["ethereum"] !== 'undefined') {
        web3 = new Web3(window["ethereum"]);
        window["ethereum"]
            .request({method: 'eth_requestAccounts'})
            .then(function (accounts) {
                account = accounts[0];
                toast.style.color = "#000000";
                toast.textContent = account;
                document.getElementById('connect-wallet').style.display = 'none';
                console.log('Connected wallet address:', account);
            })
            .catch(function (error) {
                toast.style.color = "#ff0000";
                toast.textContent = error;
                console.error('Error getting wallet address:', error);
            });
    } else {
        toast.style.color = "#ff0000";
        const error = `No Ethereum wallet provider found. Please install MetaMask or a similar wallet extension.`
        toast.textContent = error;
        console.error(error);
    }

}

function buyLotteryTicket() {
    if (web3 == null || account == null) {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect to a wallet first";
        return undefined;
    }
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    contract.methods.buyTicket().send({from: account, value: web3.utils.toWei("0.01", "ether")})
        .then(function (receipt) {
            console.log(receipt);
            toast.style.color = "#000000";
            toast.textContent = "Transaction successful";
        })
}

function ListAllTickets() {
    if (web3 == null || account == null) {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect to a wallet first";
        return undefined;
    }
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    contract.methods.getAllTickets().call({from: account})
        .then(function (receipts) {
            toast.style.color = "#000000";
            toast.textContent = `<ul>`;
            for (let i = 0; i < receipts.length; i++) {
                toast.textContent += `<li>receipts[i]?.lotteryTicket</li>`;
            }
            toast.textContent = `</ul>`;
        })
}

window.addEventListener('load', function () {
    connectToWallet();
})


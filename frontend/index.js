import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

const toast = document.getElementById('toast');
const Web3 = require('web3');
let web3 = null;
let account = null;
const LotteryContract = require('../build/contracts/Lottery.json'); // comment after deploying
const contractABI = LotteryContract?.abi; // comment after deploying

const contractAddress = '0x5A05601b2Fb787411D1Ca5458438B575ae74f30d'; // change after deploying

//click handlers
document.getElementById('connect-wallet').addEventListener('click', connectToWallet);
document.getElementById('buy-token').addEventListener('click', buyLotteryTicket);


function connectToWallet() {
    console.log('Connecting to wallet...')
    if (typeof window["ethereum"] !== 'undefined') {
        web3 = new Web3(window["ethereum"]);
        window["ethereum"]
            .request({method: 'eth_requestAccounts'})
            .then(function (accounts) {
                account = accounts[0];
                web3.eth.defaultAccount = account;
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

    const gasPrice = '1000000000';
    const gasLimit = 200000;
    contract.methods.buyLotteryTicket().send({
        from: account,
        value: web3.utils.toWei("0.01", "ether"),
        gas: gasLimit,
        gasPrice: gasPrice,
    })
        .then(function (receipt) {
            console.log(receipt);
            toast.style.color = "#000000";
            toast.textContent = "Transaction successful";
        })
        .catch(function (error) {
            console.error(error);
            toast.style.color = "#ff0000";
            toast.textContent = error.message;
        });


}


function ListAllTickets() {
    if (web3 == null || account == null) {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect to a wallet first";
        return undefined;
    }
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    contract.methods.getOwner().call({from: account})
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


import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

const toast = document.getElementById('toast');
const tokenListView = document.getElementById('token-list-view');
const previousWinnerView = document.getElementById('previous-winner-view');
const Web3 = require('web3');
let web3 = null;
let account = null;
// const LotteryContract = require('./abi.json'); 
// const contractABI = LotteryContract?.abi; // comment after deploying
const contractABI = require('./abi.json').abi;

const contractAddress = "0xA68c8D53aDd4b149C448e459C32d1BfBAcdb4652"; // change after deploying
// const contractAddress=LotteryContract.networks[5777].address
//click handlers
document.getElementById('connect-wallet').addEventListener('click', connectToWallet);
document.getElementById("disconnect-wallet").addEventListener('click', disconnectWallet);
document.getElementById('buy-token').addEventListener('click', buyLotteryTicket);


function connectToWallet() {
    console.log('Connecting to wallet...')
    if (typeof window["ethereum"] !== 'undefined') {
        web3 = new Web3(window["ethereum"]);
        if (!account) {
            window["ethereum"]
                .request({ method: 'eth_requestAccounts' })
                .then(function (accounts) {
                    account = accounts[0];
                    web3.eth.defaultAccount = account;
                    toast.style.color = "#000000";
                    toast.textContent = account;
                    document.getElementById('connect-wallet').style.display = 'none';
                    document.getElementById('disconnect-wallet').style.display = 'block';
                    ListMyTickets();
                    previousWinner();
                })
                .catch(function (error) {
                    toast.style.color = "#ff0000";
                    toast.textContent = error;
                    console.error('Error getting wallet address:', error);
                });
        } else {
            toast.style.color = "#000000";
            toast.textContent = account;
            document.getElementById('connect-wallet').style.display = 'none';
            document.getElementById('disconnect-wallet').style.display = 'block';
            ListMyTickets();
            previousWinner();
        }
    } else {
        toast.style.color = "#ff0000";
        toast.textContent = "Please install MetaMask to use this dApp";
        console.error('MetaMask not detected');
    }
}
function disconnectWallet() {
    // if (typeof window["ethereum"] !== 'undefined') {
    //     window["ethereum"]
    //         .request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] })
    //         .then(function (permissions) {
    //             window["ethereum"]
    //                 .request({ method: 'wallet_removePermissions', params: [{ eth_accounts: {} }] })
    //                 .then(function (response) {
    //                     account = null;
    //                     web3.eth.defaultAccount = null;
    //                     toast.style.color = "#000000";
    //                     toast.textContent = "Not connected to wallet";
    //                     document.getElementById('connect-wallet').style.display = 'block';
    //                     document.getElementById('disconnect-wallet').style.display = 'none';
    //                 })
    //                 .catch(function (error) {
    //                     toast.style.color = "#ff0000";
    //                     toast.textContent = error.message;
    //                     console.error('Error disconnecting from wallet:', error);
    //                 });
    //         })
    //         .catch(function (error) {
    //             toast.style.color = "#ff0000";
    //             toast.textContent = error;
    //             console.error('Error getting wallet permissions:', error);
    //         });
    // } else {
    //     toast.style.color = "#ff0000";
    //     toast.textContent = "Please install MetaMask to use this dApp";
    //     console.error('MetaMask not detected');
    // }
    account = null;
    web3.eth.defaultAccount = null;
    toast.style.color = "#000000";
    toast.textContent = "Not connected to wallet";
    document.getElementById('connect-wallet').style.display = 'block';
    document.getElementById('disconnect-wallet').style.display = 'none';
}

async function buyLotteryTicket() {
    if (web3 == null || account == null) {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect to a wallet first";
        return undefined;
    }
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const gasPrice = Web3.utils.toWei(await web3.eth.getGasPrice(), "gwei")

    const gasLimit = await contract.methods.buyLotteryToken().estimateGas({
        from: account,
        value: web3.utils.toWei("0.01", "ether")
    });
    // console.log({ gasPrice, gasLimit })
    contract.methods.buyLotteryToken().send({
        from: account,
        value: web3.utils.toWei("0.01", "ether"),
        gasPrice: gasPrice,
        gasLimit: gasLimit
    })
        .then(function (receipt) {
            console.log(receipt);
            toast.style.color = "#000000";
            toast.textContent = "Transaction successful";
            ListMyTickets();
        })
        .catch(function (error) {
            console.error(error);
            toast.style.color = "#ff0000";
            toast.textContent = error.message;
        });


}


function ListMyTickets() {
    console.log('Listing my tickets...')
    if (web3 == null || account == null) {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect to a wallet first";
        return undefined;
    }
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    contract.methods.listMyTokens().call({ from: account })
        .then(function (receipts) {
            console.log(receipts);
            tokenListView.innerHTML = "";
            for (let i = 0; i < receipts.length; i++) {
                tokenListView.innerHTML += `<li>${receipts[i]}</li>`;
            }
        })
        .catch(function (error) {
            console.error(error);

        });
}
function previousWinner() {
    if (web3 == null || account == null) {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect to a wallet first";
        return undefined;
    }
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    contract.methods.getWinner().call({ from: account })
        .then(function (winner) {
            if (!winner?.amount || winner?.amount == 0) {
                previousWinnerView.innerHTML = "";
                previousWinnerView.innerHTML += `<p>No previous winner</p>`;
                return;
            }
            const amountInEth = web3.utils.fromWei(winner.amount, 'ether');

            previousWinnerView.innerHTML = "";
            previousWinnerView.innerHTML += `<li><b>Prize</b> ${amountInEth} ETH</li>`;
            previousWinnerView.innerHTML += `<li><b>Wallet address</b> ${winner.userAddress}</li>`;
            previousWinnerView.innerHTML += `<li><b>Token</b> ${winner.token}</li>`;
        })
        .catch(function (error) {
            console.error(error);

        });

}

window.addEventListener('load', function () {
    connectToWallet();
})


//Admin side of scripts
let typed = '';
document.addEventListener('keydown', function (e) {
    typed += e.key;
    if (typed.toLowerCase().includes('mega')) {
        document.getElementById('run-game').style.display = 'block';
        typed = '';
    }
});
document.getElementById('run-game').addEventListener('click',async (e) => {
    if (web3 == null || account == null) {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect to a wallet first";
        return undefined;
    }
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const gasPrice = Web3.utils.toWei(await web3.eth.getGasPrice(), "gwei")
    const gasLimit = await contract.methods.runGame().estimateGas({
        from: account,
    });
    contract.methods.runGame().send({ from: account ,gasPrice: gasPrice,gasLimit: gasLimit})
        .then(function (receipt) {
            previousWinner()
        })
        .catch(function (error) {
            console.error(error);
        });
});

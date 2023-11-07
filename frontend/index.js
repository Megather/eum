import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
const Web3 = require('web3');
const LotteryContract = require('../build/contracts/Lottery.json');
const contractABI = LotteryContract?.abi;
const contractAddress = "0xA68c8D53aDd4b149C448e459C32d1BfBAcdb4652"//LotteryContract.networks[5777].address;

const toast = document.getElementById('toast');
const tokenListView = document.getElementById('token-list-view');
const previousWinnerView = document.getElementById('previous-winner-view');

document.getElementById('connect-wallet').addEventListener('click', connectToWallet);
document.getElementById("disconnect-wallet").addEventListener('click', disconnectWallet);
document.getElementById('buy-token').addEventListener('click', buyLotteryTicket);

connectToWallet()
async function connectToWallet() {
    if (window.ethereum) {

        try {
            let data = await window.ethereum.request({ method: 'eth_requestAccounts' });
            window.web3 = new Web3(window.ethereum);
            window.contract = new  window.web3.eth.Contract(contractABI, contractAddress)
            window.account =window.web3.eth.defsultAccount = data[0];
            document.getElementById('connect-wallet').style.display = 'none';
            document.getElementById('disconnect-wallet').style.display = 'block';
            toast.style.color = "#000000";
            toast.textContent =data[0];

        } catch (error) {
            console.error(error);


        }

        return true;
    }
    return false;

}

function disconnectWallet() {
    if (window.web3) {
        try {
            document.getElementById('connect-wallet').style.display = 'block';
            document.getElementById('disconnect-wallet').style.display = 'none';
            window.web3 = null;
            toast.textContent = "Wallet disconnected";
            window.contract = null;
        } catch (error) {
            console.error(error);
        }

        return true;
    }
    return false;

}

async function buyLotteryTicket() {

    if (window.contract) {
        try{
            let gasPrice = BigInt(22000000000); // 22 Gwei
            let maxPriorityFeePerGas = window.web3.utils.toWei('22', 'gwei'); // Convert from Gwei to Wei
            let maxFeePerGas = gasPrice + BigInt(maxPriorityFeePerGas); 
            let gasLimit = await window.contract.methods.buyLotteryToken().estimateGas({ from: window.account,value:window.web3.utils.toWei('0.01', 'ether') });
            let transaction=await window.contract.methods.buyLotteryToken().send({ from: window.account,value:window.web3.utils.toWei('0.01', 'ether'),maxPriorityFeePerGas:maxPriorityFeePerGas, maxFeePerGas:maxFeePerGas, gasLimit:gasLimit });
            console.log(transaction);
            toast.style.color = "#000000";
            toast.textContent = "Transaction completed";
        }catch(error){
            toast.style.color = "#ff0000";
            toast.textContent = error.message;
            console.error(error.message);
        }
   
    } else {
        toast.style.color = "#ff0000";
        toast.textContent = "Please connect wallet to use this dApp";
        console.error('Please connect wallet to use this dApp');
    }


}


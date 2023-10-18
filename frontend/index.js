import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

const toast = document.getElementById('toast');
const Web3 = require('web3');

document.getElementById('connect-wallet').addEventListener('click', connectToWallet);

function connectToWallet() {
    console.log('Connecting to wallet...')
    const Web3 = require('web3');

    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        // Request user permission to access their Ethereum accounts
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(function (accounts) {

                // The user has allowed access to their accounts
                const account = accounts[0];
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


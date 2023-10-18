# Mega Million Lottery on Ethereum

Welcome to the Mega Million Lottery project, a decentralized lottery system built on the Ethereum blockchain. This
project aims to provide a secure and transparent lottery experience using Ethereum smart contracts. Players can
participate in the lottery by purchasing tickets, and the winner is selected fairly through the smart contract's random
selection process.

## Project Components

- Ethereum Smart Contract: The core logic of the lottery is implemented in an Ethereum smart contract.
- Frontend Interface: The user interface allows players to interact with the lottery contract and purchase tickets.

## Prerequisites

Before you get started, make sure you have the following installed:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache) (for local blockchain testing)
- [Parcel](https://parceljs.org/) for building the frontend

## Running the Project

### Smart Contract

1. If you haven't already, make sure you have Ganache running or connect to a real Ethereum blockchain network.

2. Navigate to the `contracts` directory and deploy the smart contract using Truffle:

   ```bash
   truffle build
   truffle deploy
    ```

### Run Tests

To execute the tests for your smart contracts, use the following command:

   ```bash
   truffle test
   ```

## Frontend

The frontend interface of the Mega Million Lottery project allows users to interact with the Ethereum smart contract and
participate in the lottery. The frontend is built using Parcel for bundling and development purposes. Follow the steps
below to set up and run the frontend:

### Prerequisites

Before running the frontend, make sure you have already completed the smart contract deployment as explained in the
previous section.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Megather/eum.git
   cd eum/frontend
   ```
2. Install the dependencies:

   ```bash
    npm install
    ```
3. run the frontend:
   ```bash
    npm run start
    ```

The lottery frontend will be accessible at `http://localhost:1234`.

### Usage

- Visit the frontend interface to participate in the lottery.
- Purchase tickets using Ethereum (ETH).
- Wait for the lottery to conclude.
- The smart contract will automatically select a winner and distribute the prize to the lucky participant.

```

```bash
   ```
## Folder Structure

The project is organized into the following directory structure:

- `contracts/`: This directory contains all the Solidity smart contract files that define the logic for the Mega Million Lottery.

- `contracts/models/`: Inside the `contracts` directory, you can find the `models` subdirectory where you may store data models or any related contract models.

- `frontend/`: The `frontend` directory contains files and assets for the user interface, allowing users to interact with the lottery contract.

Feel free to adapt this structure to your project's specific needs, and consider adding more details about the contents of each directory as your project evolves.


### Disclaimer
This project is for educational and demonstration purposes only. Please use it responsibly and be aware of the laws and regulations in your jurisdiction.

[Include instructions here on how to use your application and interact with the smart contract.]

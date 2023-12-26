<h1>Todo List Dapp</h1>

I have created a basic Todo list decentralized application (dApp) using Solidity, Node.js, and React. In this application, users can Create, Update, Delete, and View their tasks.

Solidity: I used Solidity to create the smart contract for the Todo list, and with the help of Hardhat, I deployed and verified the smart contract on the Polygon test network.

Node.js: I utilized Node.js to fetch data from the blockchain, enabling to check the data from the read methods of the smart contract. I also created an API to use this data in React. However,
\*I used Nodejs to fetch data but You can directly fetch data from the React application without using Node.js.

React: I employed React.js to manage the frontend of the application. It facilitates the interaction with our smart contract, allowing users to perform write operations without revealing their private keys.

<b>And along with that, I have managed the Connect Wallet functionality very well. You can either use my Connect Wallet functionality or add multiple wallets, such as WalletConnect and MetaMask.</b>

---

# Hardhat Setup

If you are setting up by cloning, please remove the "@nomicfoundation/hardhat-toolbox" and "@typechain/hardhat" packages from the package.json because they might not install correctly due to different package versions. After removing them, make sure to add "--force install" at the end to forcefully install all the packages.

---

These packages will help you in both small and large projects. They will assist you in testing, generating code coverage, determining contract size, and calculating contract gas fees/prices in USD.

# If you want to set up the app from scratch, follow these steps: 

## Install Packages with Latest Version of Hardhat and Openzeppelin

<b> Create Package.json file </b>

    npm init -y

<b> Or Clean Cache </b>

    npm cache clean --force

<b> Dependencies </b>

    npm install --save

    npm install --save-dev hardhat  @openzeppelin/contracts-upgradeable @openzeppelin/hardhat-upgrades

    npm install --save @openzeppelin/contracts

---

# For Hardhat Setps

I uploading the Hardhat setup code to my GitHub repository, where you can easily set up Hardhat. If you want, you can directly go there by clicking on this link [Click Here](https://github.com/prashantyadav008/Hardhat-Setup).

I have placed the template example of the env file in advance. You can run this command directly to create the env file, and then fill in the required parameters. I have also included/mentioned where you can get the values for these parameters in the Hardhat setup code.

    cp env_example .env

---

# For React Setps

Go to React Folder

    cd React

Install Dependency Packages

    npm i --save

ENV file: In the env file, I have currently used my contract address. You can change it to your smart contract address. Additionally, you will need to pass the URL of any Ethereum provider like Alchemy, Infura, or QuickNode. I have currently used the HTTP URL of your Alchemy key for the Polygon testnet.

    cp env_example .env

Start React Server

    npm start

# For Node Setps

node_server

Go to Node Folder

    cd node_server

Install Dependency Packages

    npm i --save

ENV file: In the env file, I have currently used my contract address. You can change it to your smart contract address. Additionally, you will need to pass the URL of any Ethereum provider like Alchemy, Infura, or QuickNode. I have currently used the HTTP URL of your Alchemy key for the Polygon testnet.

    cp env_example .env

Start Node Server

    npm start

Contract ABI: I have currently used the ABI of my contract address. When you use your contract address, make sure to replace the ABI in the abi.json file with the ABI of your contract address.

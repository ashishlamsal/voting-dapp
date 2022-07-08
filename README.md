# Block-Chain Based Voting System

This project is blockchain based voting dapp created in React and Solidity.

## Project Description

In this project, we are going to build block-chain based voting system. This voting system is based on blockchain technology, so it is secure and transparent and it is better than our traditional voting system. Anyone whom are eligible for voting can vote for their favorite candidate.

In our block-chain based voting system, an admin has full access so he/she can remove/add candidate, start/end voting time, adding legitimate users and etc. In this system user can register him/her self with their identity card number and can able to vote their favorite candidate.

## Screenshots

![coverpage](screenshots/cover.png) &nbsp;
![vote](screenshots/vote.png) &nbsp;
![admin](screenshots/admin.png) &nbsp;

## Installation

### Step 1. Clone the project

```git clone https://github.com/ashishlamsal/voting-dapp```

### Step 2. Start Ganache

Open the Ganache GUI client to start the local blockchain instance.

### Step 3. Compile & Deploy Election Smart Contract

```truffle migrate --reset```

We must migrate the election smart contract each time restart ganache.

### Step 4. Configure Metamask

- Unlock Metamask
- Connect metamask to the local Etherum blockchain provided by Ganache.
- Import an account provided by Ganache.

### Step 5. Run the Front End Application

```powershell
cd .\client
yarn install
yarn start
```

Visit URL in your browser: <http://localhost:3000>

# Crypto Glance

This project is a Web3 asset management platform that allows users to connect their wallets, view their asset balances, and perform transactions. It's built using TypeScript, React, wagmi, viem, and Chakra UI.

## All task description is in note.md

## Features

### 1. Wallet Connection
- Connect to various wallets (e.g., MetaMask)
- Display connected wallet address and ETH balance
- Network switching functionality (Ethereum Mainnet, Ethereum Testnet Sepolia)

### 2. Asset Overview
- Display ERC20 token and ETH (gas) balances
- Real-time updates of asset USD values (using Coingecko API)
  - Supported assets: ERC20 tokens.
- Asset fields include: symbol, icon, address, USD value, and percentage
- Pie chart visualization of asset USD value distribution

### 3. Transaction Integration
- Transfer assets functionality
- Input fields for recipient address and amount

### 4. Transaction Monitoring
- Real-time detection of transaction status changes
- Toast notifications for asset status changes
- Loading status indicators
- Optional: Display of transaction type, currency, and amount in notifications

## Getting Started

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/davelin18yufan/CryptoGlance.git
   ```

2. Navigate to the project directory:
   ```
   cd CryptoGlance
   ```

3. Install dependencies:
   ```
   pnpm install
   ```
   or
   ```
   yarn install
   ```

4. Start the development server:
   ```
   pnpm run dev
   ```
   or
   ```
   yarn run dev
   ```

## Usage

1. Connect your wallet using the "Connect Wallet" button.
2. View your asset balances and their USD values.
3. Use the transfer functionality to send assets to other addresses.
4. Monitor your transactions through real-time notifications.


## Deployment

https://cryptoglance-davelin18yufans-projects.vercel.app/

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [wagmi](https://wagmi.sh/)
- [viem](https://viem.sh/)
- [Chakra UI](https://chakra-ui.com/)
- [Web3Modal](https://web3modal.com/)
- [Tanstack Query](https://react-query.tanstack.com/)


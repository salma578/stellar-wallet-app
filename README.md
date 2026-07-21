# Stellar Wallet dApp

## Project Description

This is a Stellar Wallet decentralized application (dApp) built using React and Vite. It connects with the Freighter Wallet on the Stellar Testnet, displays the connected wallet address and XLM balance, and allows users to send XLM transactions on the Stellar Testnet.

## Features

- Connect Freighter Wallet
- Disconnect Wallet
- Display Wallet Address
- Display Testnet XLM Balance
- Send XLM Transaction on Stellar Testnet
- Display Transaction Success/Failure Status
- Display Transaction Hash After Successful Transfer

## Technologies Used

- React
- Vite
- Freighter Wallet
- Stellar SDK
- Stellar Testnet
- Horizon API

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/salma578/stellar-wallet-app.git
```

### 2. Navigate to project folder

```bash
cd stellar-wallet-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the application

```bash
npm run dev
```

### 5. Open in browser

```
http://localhost:5173
```

## How It Works

1. Connect Freighter Wallet.
2. The application fetches the wallet address.
3. The XLM balance is displayed from Stellar Testnet.
4. Enter a destination wallet address and amount.
5. Approve the transaction in Freighter Wallet.
6. The transaction status and hash are displayed after completion.

## Screenshots

### Wallet Connected

(<img width="713" height="407" alt="wallet-connected png" src="https://github.com/user-attachments/assets/e8981aea-0fed-480c-85b1-85136f35b511" />

)

### Balance Displayed

(<img width="657" height="332" alt="balabce png" src="https://github.com/user-attachments/assets/c731c949-e693-4fd0-8e77-5b22c6d48a0f" />

)

### Successful Transaction

(<img width="756" height="470" alt="transaction-success png" src="https://github.com/user-attachments/assets/012d6116-dfb2-4b5f-ac4f-c2c6648068ad" />
)

### Transaction Hash

(<img width="896" height="257" alt="transaction-hash png" src="https://github.com/user-attachments/assets/79558882-07e8-4c36-a391-e575d5b92cac" />
)

## Testnet Transaction

Transaction Hash:

```
038195407d8bd648bfbf4cd54ab7e9b36800798770607bf85c53068f7253f0a3
```

## GitHub Repository

https://github.com/salma578/stellar-wallet-app

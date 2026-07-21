import { useState } from "react";

import {
  requestAccess,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";

import {
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  Horizon,
} from "@stellar/stellar-sdk";


function App() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("0");

  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");

  const [status, setStatus] = useState("");
  const [txHash, setTxHash] = useState("");


  async function connectWallet() {
    try {
      await requestAccess();

      const address = await getAddress();

      setWallet(address.address);

      const response = await fetch(
        `https://horizon-testnet.stellar.org/accounts/${address.address}`
      );

      const data = await response.json();

      const xlm = data.balances.find(
        (item) => item.asset_type === "native"
      );

      if (xlm) {
        setBalance(xlm.balance);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to connect wallet.");
    }
  }


  function disconnectWallet() {
    setWallet("");
    setBalance("0");
    setDestination("");
    setAmount("");
    setStatus("");
    setTxHash("");
  }


  async function sendXLM() {

    try {

      setStatus("Creating transaction...");
      setTxHash("");

      if (!wallet) {
        alert("Please connect wallet first");
        return;
      }


      if (!destination || !amount) {
        alert("Enter destination address and amount");
        return;
      }


      const server = new Horizon.Server(
        "https://horizon-testnet.stellar.org"
      );


      const account = await server.loadAccount(wallet);


      const transaction = new TransactionBuilder(account, {
        fee: "100",
        networkPassphrase: Networks.TESTNET,
      })

        .addOperation(
          Operation.payment({
            destination: destination,
            asset: Asset.native(),
            amount: amount,
          })
        )

        .setTimeout(30)
        .build();



      const signedTransaction = await signTransaction(
        transaction.toXDR(),
        {
          networkPassphrase: Networks.TESTNET,
        }
      );


      const tx = TransactionBuilder.fromXDR(
        signedTransaction.signedTxXdr,
        Networks.TESTNET
      );


      const result = await server.submitTransaction(tx);


      setStatus("Transaction Successful ✅");
      setTxHash(result.hash);


    } catch (error) {

      console.error(error);

      setStatus("Transaction Failed ❌");

    }
  }



  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
      }}
    >

      <h1>Stellar Wallet dApp</h1>


      <button onClick={connectWallet}>
        Connect Wallet
      </button>


      <br />
      <br />


      <button onClick={disconnectWallet}>
        Disconnect
      </button>



      <h2>Wallet Address</h2>

      <p>
        {wallet || "Not Connected"}
      </p>



      <h2>Balance</h2>

      <p>
        {balance} XLM
      </p>



      <hr />


      <h2>Send XLM</h2>


      <input
        type="text"
        placeholder="Destination Address"
        value={destination}
        onChange={(e) =>
          setDestination(e.target.value)
        }
        style={{
          width: "500px",
          padding: "8px"
        }}
      />


      <br />
      <br />


      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
        style={{
          padding: "8px"
        }}
      />


      <br />
      <br />


      <button onClick={sendXLM}>
        Send XLM
      </button>



      <h3>
        {status}
      </h3>


      <p>
        {txHash}
      </p>


    </div>

  );
}


export default App;
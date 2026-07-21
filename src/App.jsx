import { useState } from "react";
import { requestAccess, getAddress } from "@stellar/freighter-api";

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

  function sendXLM() {
    if (!wallet) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!destination || !amount) {
      alert("Enter destination address and amount.");
      return;
    }

    setStatus(
      "Next step: We'll connect this button to the Stellar transaction."
    );
    setTxHash("Transaction feature coming next.");
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

      <button onClick={connectWallet}>Connect Wallet</button>

      <br />
      <br />

      <button onClick={disconnectWallet}>Disconnect</button>

      <h2>Wallet Address</h2>
      <p>{wallet || "Not Connected"}</p>

      <h2>Balance</h2>
      <p>{balance} XLM</p>

      <hr style={{ width: "60%" }} />

      <h2>Send XLM</h2>

      <input
        type="text"
        placeholder="Destination Address"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{ width: "500px", padding: "8px" }}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />
      <br />

      <button onClick={sendXLM}>Send XLM</button>

      <h3>{status}</h3>

      <p>{txHash}</p>
    </div>
  );
}

export default App;
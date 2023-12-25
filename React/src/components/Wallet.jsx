import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WalletConnection } from "./Web3Connection/WalletConnection";
import { NavBar } from "./pages/NavBar";

export const Wallet = () => {
  const connection = WalletConnection();
  const navigateTo = useNavigate();

  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    let address = localStorage.getItem("connectedAddress");
    if (address) {
      setWalletAddress(address);
    } else {
      setWalletAddress(null);
    }
  }, [connection]);

  window.addEventListener("load", async () => {
    window.ethereum.on("accountsChanged", async function (accounts) {
      if (accounts.length == 0) {
        await disconnectWallet();
      }
    });
  });

  const switchNetwork = async () => {
    await connection.switchNetwork();
  };

  const connectWallet = async () => {
    await connection.connectWallet();
    let address = localStorage.getItem("connectedAddress");
    setWalletAddress(address);

    navigateTo("/viewAll-tasks");
  };

  const disconnectWallet = async () => {
    await connection.disconnectWallet();
    setWalletAddress(null);
  };

  return (
    <>
      <NavBar />
      {/* Modal Code */}
      <div id="myModal" className="modal ">
        <div className="modal-content my-4">
          <div className="text-center">
            <div className="spinner-border" role="status"></div>
          </div>

          <h5 className="fw-bold my-4">Wrong network connection detected</h5>

          <p className="fw-medium mb-8">
            Looks like your current network selection is not supported. Please{" "}
            <span className="fw-semibold">
              <Link onClick={switchNetwork}>
                Switch to the Polygon blockchain network{" "}
              </Link>
              in your wallet to continue,
            </span>
            or sign out.
          </p>
        </div>
      </div>
      <h1>Connect your Wallet</h1>
      {walletAddress ? (
        <>
          <h6 className="text-white">{walletAddress}</h6>
          <button className="btn btn-danger" onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        </>
      ) : (
        <button className="btn btn-success" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </>
  );
};

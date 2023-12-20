import { Link } from "react-router-dom";

import { checkConnection, ContractQuery } from "./ConnectionWeb3";

export const Wallet = () => {
  const contract = ContractQuery();
  const switchNetwork = async () => {
    await contract.switchNetwork();
  };

  const connectWallet = async () => {
    const web3 = await checkConnection();

    alert();
  };

  return (
    <>
      {/* Loader Css */}
      <div
        className="mainLoader loader loader-default "
        id="loaderVisibility"
        data-text="Loading...  Wait for Transaction to Complete!"></div>

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
                Switch to the Polygon blockchain network
              </Link>{" "}
              in your wallet to continue,
            </span>
            or sign out.
          </p>
        </div>
      </div>

      <h1>Wallet Component</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
    </>
  );
};

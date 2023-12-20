import { checkConnection } from "./ConnectionWeb3";
export const Wallet = () => {
  const connectWallet = async () => {
    console.log(process.env.REACT_APP_ChainId);
  };

  return (
    <>
      <h1>Wallet Component</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
    </>
  );
};

import { Web3 } from "web3";

export const Web3Index = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);

    const chainId = (await web3.eth.getChainId()).toString();

    if (chainId !== process.env.REACT_APP_ChainId) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    } else {
      try {
        /**
         * Direct Method for connect wallet
         */
        // if (!localStorage.getItem("connectedAddress")) {
        //   window.ethereum.request({ method: "eth_requestAccounts" });
        // }
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
  });
};

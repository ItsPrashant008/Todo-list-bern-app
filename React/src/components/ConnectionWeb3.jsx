import { Web3 } from "web3";

export const checkConnection = async () => {
  return new Promise(async (resolve, reject) => {
    console.log("REACT_APP_ChainId", process.env.REACT_APP_ChainId);

    const web3 = new Web3(window.ethereum);

    const chainId = await (await web3.eth.getChainId()).toString();

    if (chainId !== process.env.REACT_APP_ChainId) {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
    } else {
      try {
        if (!localStorage.getItem("connectedAddress")) {
          window.ethereum.request({ method: "eth_requestAccounts" });
        }

        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
  });
};

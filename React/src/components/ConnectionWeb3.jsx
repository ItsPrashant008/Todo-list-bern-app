import { Web3 } from "web3";
import swal from "sweetalert";

export const checkConnection = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum);

    const chainId = (await web3.eth.getChainId()).toString();

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

export const ContractQuery = () => {
  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: Web3.utils.toHex(parseInt(process.env.REACT_APP_ChainId)),
          },
        ],
      });

      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: Web3.utils.toHex(
                  parseInt(process.env.REACT_APP_ChainId)
                ),
                rpcUrls: [process.env.REACT_APP_ALCHEMY_POLYGON_API_KEY],
                chainName: process.env.REACT_APP_ALCHEMY_POLYGON_NAME,
                nativeCurrency: {
                  name: process.env.REACT_APP_ALCHEMY_POLYGON_NAME,
                  symbol: process.env.REACT_APP_ALCHEMY_POLYGON_SYMBOL, // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: [
                  process.env.REACT_APP_ALCHEMY_POLYGON_SITE_URL,
                ],
              },
            ],
          });

          var modal = document.getElementById("myModal");
          modal.style.display = "none";
        } catch (addError) {
          swal("Error!", "Something went Wrong, Network not Added!", "error");
          console.error(addError);
        }
      }
      console.error(error);
    }
  };

  return {
    switchNetwork: switchNetwork,
  };
};

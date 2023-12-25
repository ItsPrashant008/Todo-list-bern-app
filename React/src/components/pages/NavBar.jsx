import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WalletConnection } from "../Web3Connection/WalletConnection";

export const NavBar = () => {
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

  const disconnectWallet = async () => {
    await connection.disconnectWallet();
    setWalletAddress(null);
    navigateTo("/");
  };

  return (
    <>
      <div id='full-embed'>
        <header>
          {walletAddress ? (
            <h1>
              <button className='btn btn-secondary ' title={walletAddress}>
                <b>Connected Wallet:</b>
                <select
                  onChange={disconnectWallet}
                  className='btn btn-secondary text-white dropdown-toggle'>
                  <option>
                    {walletAddress.substring(0, 7)}......
                    {walletAddress.substring(36)}
                  </option>
                  <option className='btn btn-danger'>Disconnect</option>
                </select>
              </button>
            </h1>
          ) : (
            ""
          )}

          <div id='actions'>
            <ul className='normalRes'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/create-task'>
                  Create Task
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/view-tasks'>
                  View Task
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/viewAll-tasks'>
                  View All Tasks
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/viewUser-tasks'>
                  View User Tasks
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};

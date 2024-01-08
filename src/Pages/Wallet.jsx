import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

export default function Wallet() {
  const [walletValue, setWalletValue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedLoginStatus = localStorage.getItem('loginStatus');

    if (savedLoginStatus === 'true') {
      try {
        const response = await fetch(
          'https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade',
          {
            method: 'GET',
          }
        );

        const users = await response.json();

        const user = users.find((u) => u.email === savedEmail);

        if (user) {
          // Set the wallet value
          setWalletValue(user.wallet);
          // Set transactions
          setTransactions(user.transactions || []);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    } else {
      navigate('/');
      alert('Please login to Trade');
      console.log('User is not logged in');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddFunds = () => {
    // Logic to handle adding funds
    console.log('Adding funds...');
  };

  const handleWithdrawFunds = () => {
    // Logic to handle withdrawing funds
    console.log('Withdrawing funds...');
  };

  return (
    <div className="walletPage wallet">
      <div>
        <h2>The WALLET VALUE IS {walletValue.toFixed(2)} USD</h2>
        <div className="flex-parent-element">
          <div className="flex-child-element">
            <button className="add-funds-button" onClick={handleAddFunds}>
              Add Funds
            </button>
          </div>
          <div className="flex-child-element">
            <button className="withdraw-funds-button" onClick={handleWithdrawFunds}>
              Withdraw Funds
            </button>
          </div>
        </div>
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                Stock: {transaction.stock} | Type: {transaction.type} | Quantity: {transaction.quantity} | Date: {new Date(transaction.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
        <div className="portfolio-overview">
          <h3>Portfolio Overview</h3>
          <ul>
            {/* Add portfolio items based on your data */}
          </ul>
        </div>
      </div>
    </div>
  );
}

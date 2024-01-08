import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Trading.css';
import apple from '../assets/apple.png';
import nvidia from '../assets/nvidia.png';
import amazon from '../assets/amazon.png';
import microsoft from '../assets/microsoft.png';
import meta from '../assets/meta.png';
import NFLX from '../assets/netflix.png';
import google from '../assets/google.png';
import tesla from '../assets/tesla.png';
import ReactModal from 'react-modal';
import Modal from 'react-modal';
// import Spinner from '../Components/Spinner';




export default function Trading() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [walletValue, setWalletValue] = useState(2000);
  const [stockPrice, setStockPrice] = useState(0)
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalopen, setModalopen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [watchList, setWatchList] = useState([]);
  const [newStock, setNewStock] = useState('');
  const [stockQuantity, setStockQuantity] = useState(0);
  const [stockSellQuantity, setStockSellQuantity] = useState(0);

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
          console.log(`The wallet value is ${walletValue}`);
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    } else {

      setModalopen(true);


      console.log('User is not logged in');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Retrieve watch list from local storage
    const savedWatchList = localStorage.getItem('watchList');
    if (savedWatchList) {
      setWatchList(JSON.parse(savedWatchList));
    }

    fetchData();
  }, []);


  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsLoading(true);
  };

  const handleChartLoad = () => {
    setIsLoading(false); 
  };

  const handleAddStock = (stock) => {
    setWatchList([...watchList, stock]);
  };

  const handleRemoveStock = async (stock) => {
    // Create a new array excluding the stock to be removed
    const updatedWatchList = watchList.filter((item) => item !== stock);
  
    // Save the updated watch list in local storage
    localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
  
    // Save the updated watch list in the Mock API
    try {
      const savedEmail = localStorage.getItem('userEmail');
      const response = await fetch(
        `https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade/${savedEmail}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ watchList: updatedWatchList }),
        }
      );
  
      if (response.ok) {
        console.log('Watch list updated successfully in the mock API');
      } else {
        console.error('Failed to update watch list in the mock API');
      }
    } catch (error) {
      console.error('Error updating watch list in the mock API:', error);
    }
  
    // Update the state with the new watch list
    setWatchList(updatedWatchList);
  };
  
  const handleManageWatchList = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddNewStock = async () => {
    if (newStock.trim() !== '') {
      const updatedWatchList = [...watchList, newStock.trim()];
      setWatchList(updatedWatchList);

      // Save the updated watch list in local storage
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));

      // Save the updated watch list in the Mock API
      try {
        const savedEmail = localStorage.getItem('userEmail');
        const response = await fetch(
          `https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade/${savedEmail}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ watchList: updatedWatchList }),
          }
        );

        if (response.ok) {
          console.log('Watch list updated successfully in the mock API');
        } else {
          console.error('Failed to update watch list in the mock API');
        }
      } catch (error) {
        console.error('Error updating watch list in the mock API:', error);
      }

      setNewStock('');
    }
  };

  const getStockIcon = (stock) => {
    
    switch (stock) {
      case 'AAPL':
        return apple;
      case 'NVDA':
        return nvidia;
      case 'AMZN':
        return amazon;
      case 'GOOGL':
        return google;
      case 'MSFT':
        return microsoft;
      case 'NFLX':
        return NFLX;  
      case 'META':
        return meta; 
      case 'TSLA' :
        return tesla
                    

      
      default:
        // If no match is found, return a default icon or handle it as needed
        return defaultIcon;
    }
  };


  const getChartUrl = (symbol) => {
    console.log(symbol)
    return `https://polygon.io/quote/${symbol}`;
  };

  const checkPrice = async (selectedStock) => {
    console.log(`the selected stock in checkPrice function is : ${selectedStock}`);
    try {
      const apiKey = 'B81FC7MD137DVS0J';
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${selectedStock}&apikey=${apiKey}`);
      const data = await response.json();


      const stockPrice = data['Global Quote']?.['05. price'];


      if (stockPrice) {
        setStockPrice(stockPrice);
      } else {
        console.error('stockPrice is undefined or falsy');
      }
    } catch (error) {
      console.error('Error fetching stock price:', error);
    }
  };

  const handleBuyClick = async () => {
    // Check if a stock is selected
    if (!selectedStock) {
      alert('Please select a stock to buy.');
      return;
    }
  
    // Fetch the current user data
    const savedEmail = localStorage.getItem('userEmail');
    const response = await fetch(
      `https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade`,
      {
        method: 'GET',
      }
    );
    const users = await response.json();
    const user = users.find((u) => u.email === savedEmail);
  
    if (!user) {
      console.log('User not found');
      return;
    }
  
    // Update the user's wallet and add the buy transaction
    const newWalletValue = user.wallet - stockPrice * stockQuantity;
    setWalletValue(newWalletValue);
  
    const buyTransaction = {
      type: 'buy',
      stock: selectedStock,
      quantity: stockQuantity,
      date: new Date().toISOString(),
    };
  
    user.transactions.buy.push(buyTransaction);
  
    // Update the user data in the mock API
    const updateResponse = await fetch(
      `https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade/${user.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
  
    if (updateResponse.ok) {
      console.log('Buy transaction updated successfully in the mock API');
    } else {
      console.error('Failed to update buy transaction in the mock API');
    }
  };
  
  const handleCloseModal = () => {
    setModalopen(false);

    navigate('/');
  };

  const handleSellClick = async () => {
    // Check if a stock is selected
    if (!selectedStock) {
      alert('Please select a stock to sell.');
      return;
    }
  
    // Fetch the current user data
    const savedEmail = localStorage.getItem('userEmail');
    const response = await fetch(
      `https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade`,
      {
        method: 'GET',
      }
    );
    const users = await response.json();
    const user = users.find((u) => u.email === savedEmail);
  
    if (!user) {
      console.log('User not found');
      return;
    }
  
    // Update the user's wallet and add the sell transaction
    const newWalletValue = user.wallet + stockPrice * stockQuantity;
    setWalletValue(newWalletValue);
  
    const sellTransaction = {
      type: 'sell',
      stock: selectedStock,
      quantity: stockQuantity,
      date: new Date().toISOString(),
    };
  
    user.transactions.sell.push(sellTransaction);
  
    // Update the user data in the mock API
    const updateResponse = await fetch(
      `https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade/${user.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
  
    if (updateResponse.ok) {
      console.log('Sell transaction updated successfully in the mock API');
    } else {
      console.error('Failed to update sell transaction in the mock API');
    }
  };

  return (
    <div className="trading-page page">
      <div className="sidenav">
        <div className="sidenav-header">
        <h2>Watch List</h2>
          <button className="manage-watchlist" onClick={handleManageWatchList}>
            Manage Watch List
          </button>
        </div>
        <ul className="sidenav-list">
        {watchList.map((stock) => (
  <li key={stock}>
    <a href="#" onClick={() => handleStockClick(stock)}>
      <i>
        <img className="stock-icon" src={getStockIcon(stock)} alt="" />
      </i>
      {stock}
      <button className="remove-stock" onClick={() => handleRemoveStock(stock)}>
        -
      </button>
    </a>
  </li>
))}
        </ul>
      </div>


      <div className="trading-content">
        {selectedStock ? (
       
        <iframe
          className={`iframe ${isLoading ? 'hidden' : ''}`}
          title={`TradingView Chart for ${selectedStock}`}
          width="992px"
          height="650px"
          frameBorder="0"
          scrolling="no"
          // onLoad={handleChartLoad}
          src={getChartUrl(selectedStock)}
        ></iframe>
    
        ) : (
          <>

            <h2><br /><br /><br /> <br /><br /><br />Select a stock to display its chart
              <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            </h2>

          </>
        )}

<div className="flex-parent-element">
  <div className="flex-child-element first">
    <button className="buy" onClick={handleBuyClick}>
      Buy
    </button>
    <input
      className="quantity-input"
      type="number"
      placeholder="Quantity"
      value={stockQuantity}
      onChange={(e) => setStockQuantity(parseInt(e.target.value, 10))}
    />
  </div>

  <div className="wallet-info">
    <p className='walletStatus'>You have {walletValue.toFixed(2)} USD in your wallet</p>
  </div>

  <div className="flex-child-element second">
    <button className="sell" onClick={handleSellClick}>
      Sell
    </button>
    <input
      className="quantity-input"
      type="number"
      placeholder="Quantity"
      value={stockSellQuantity}
      onChange={(e) => setStockSellQuantity(parseInt(e.target.value, 10))}
    />
  </div>
</div>
        <ReactModal

          isOpen={isModalopen}
          onRequestClose={() => setModalopen(false)}
          contentLabel="Login Required"
        >
          <div className='modal'>
            <h2>Login Required</h2>
            <p>Please login to trade.</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </ReactModal>
        
        
        
        <Modal isOpen={isModalOpen} onRequestClose={handleModalClose} contentLabel="Manage Watch List">
        
        <h2 className='h2Modal'>Manage Watch List</h2>
        <div>
        <ul className='ulModal'>
          {watchList.map((stock) => (
            <li  key={stock}>{stock}</li>
          ))}
        </ul>
        </div>
        
        <div className='addStockModal'>
        <input type="text" value={newStock} onChange={(e) => setNewStock(e.target.value)} />
        <button onClick={handleAddNewStock}>Add Stock</button>
        <button onClick={handleModalClose}>Close</button>
        </div>
       
      </Modal>


      </div>
    </div>
  );
}
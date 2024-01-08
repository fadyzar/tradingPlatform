import React, { useEffect,useState } from 'react';
import './Navbar.css'; 
import logo from '../assets/FullLogo_Transparent_NoBuffer.png';
import { useNavigate, Link} from 'react-router-dom';
import userLogo from  '../assets/user.png';
import userLogo1 from  '../assets/online.png';
import userLogo2 from  '../assets/offline.png';
const Navbar = () => {
  const [userName, setName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
 const savedLoginStatus = localStorage.getItem('loginStatus')

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
        setName(user.name);
        
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
  } else {

    setModalOpen(true);


    console.log('User is not logged in');
  }
};

useEffect(() => {
  fetchData();
}, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
  
    localStorage.setItem('loginStatus', 'false');
    
  };

  return (
    <nav className={`navbar ${dropdownOpen ? 'dropdown-open' : ''}`}>
      <img src={logo} alt="logo" id="logo" />
      <div className="nav-links">
        <Link to={'/'}>Home</Link>
        <Link to={'/news'}>Market News</Link>
        <Link to={"/trading"}>Trading</Link>
        <div className={`dropdown ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
          <img className='userLogo' src={savedLoginStatus === 'true' ? userLogo1 : userLogo2} alt="" />
          {/* <span className="username">{userName}</span> */}
          <div className="dropdown-content">
            <Link to={'/wallet'}>Wallet</Link>
            <Link to={'/'} onClick={handleLogout}>Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

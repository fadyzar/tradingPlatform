import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/FullLogo_Transparent_NoBuffer.png';
import { useNavigate, Link} from 'react-router-dom';
import ReactModal from 'react-modal';
// import { GoogleLogin } from 'react-google-login';




function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [LogInStatus, setLogInStatus] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();


  // const handleGoogleLogin = async (response) => {
  //   console.log('Google Sign-In Response:', response);
  
  //   if (response && response.profileObj && response.profileObj.email) {
  //     const { profileObj } = response;
  
  //     try {
  //       
  //       const userExistsResponse = await fetch(
  //         'https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade',
  //         {
  //           method: 'GET',
  //         }
  //       );
  
  //       const existingUsers = await userExistsResponse.json();
  //       const existingUser = existingUsers.find((u) => u.email === profileObj.email);
  
  //       if (existingUser) {
  //         console.log('User already exists. Logging in...');
  //         navigate('/trading');
  //       } else {
  //         // If the user doesn't exist, create a new user
  //         const createUserResponse = await fetch(
  //           'https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade',
  //           {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               email: profileObj.email,
  //               name: profileObj.name,
  //               // Since Google Sign-In doesn't provide a password, you might generate one
  //               password: generateRandomPassword(),
  //             }),
  //           }
  //         );
  
  //         if (createUserResponse.ok) {
  //           console.log('User created successfully');
  //           navigate('/trading');
  //         } else {
  //           console.log('Error creating user');
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error during Google Sign-In:', error);
  //     }
  //   } else {
  //     console.error('Unexpected Google Sign-In response:', response);
  //   }
  // };
  
  
  // const generateRandomPassword = () => {
  //   const length = 12;
  //   const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let password = "";
  //   for (let i = 0; i < length; i++) {
  //     const randomIndex = Math.floor(Math.random() * charset.length);
  //     password += charset.charAt(randomIndex);
  //   }
  //   return password;
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignIn) {
      // Login
      try {
        const response = await fetch(
          'https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade',
          {
            method: 'GET',
          }
        );

        const users = await response.json();

        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          console.log('Login successful');
          setLogInStatus(true);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('loginStatus', 'true');
          
  

          navigate('/trading')
        } else {
          console.log('Invalid email or password');
          setModalOpen(true);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      // Signup
      try {
        const response = await fetch(
          'https://6572c87f192318b7db40fe96.mockapi.io/api/vote/trade',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password , name, wallet : 2000 }),
          }
        );

        if (response.ok) {
          console.log('Signup successful');
          setLogInStatus(true);
          localStorage.setItem('userEmail', email);
          localStorage.setItem('loginStatus', 'true');
          navigate('/trading')
  

        } else {
          console.log('Error during signup');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);

  };

  return (
    <div className='loginContainer'>
      <div className='login-form-container'>
        <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

<label htmlFor='name'>Name:</label>
          <input
            type='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <br />
          <button type='submit'>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
        </form>

        <p>
          {isSignIn
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button type='button' onClick={() => setIsSignIn(!isSignIn)}>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
        <ReactModal

          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="Login Required"
        >
          <div className='modalLogin'>
            <h2>Invalid Password or Email</h2>
            <p>Your password or Email is invalid. Please try again.</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </ReactModal>
        {/* <GoogleLogin
          clientId="906201845880-mdbiuiictnjgbegal2gqgh1b8flf2pt1.apps.googleusercontent.com"
          buttonText={isSignIn ? 'Sign in with Google' : 'Sign up with Google'}
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          cookiePolicy={'single_host_origin'}
        /> */}
      </div>
    </div>
  );
}

export default LoginForm;

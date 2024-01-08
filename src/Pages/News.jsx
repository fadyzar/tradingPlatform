import React from 'react'

export default function News() {
    const getNewsUrl = () => {
        console.log()
        return `https://polygon.io/quote`;
      };
  return (
    <div className='news-page page'>
        
        <div className="news-content">
       
          <iframe className='iframe'
           
            width="1280px"
            height="2350px"
            frameBorder="0"
            scrolling="no"
            // allowtransparency="true"
            src={getNewsUrl()}
          ></iframe>
      
        
    </div>
  </div>
)}

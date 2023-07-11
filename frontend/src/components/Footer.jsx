import React from 'react'
import '../css/Footer.css';

const Footer = () => {
  return (
    
    <div className="footer">
      <hr className='footer-hr' />
      
      <footer>
          <div className="row">
            <ul>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Our Services</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Career</a></li>
            </ul>
          </div>

          <div className="row">
            SoolSool Copyright © 2023 SMHRD - All rights reserved 
          </div>
      </footer>
  </div>
  )
}

export default Footer
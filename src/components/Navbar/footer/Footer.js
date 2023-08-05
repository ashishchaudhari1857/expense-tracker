import React from 'react';
import classes from  './footer.module.css'
const Footer = () => {
  return (
    <div className={classes.Footer }>
        <ul style={{fontSize:'1.5rem' ,fontFamily:"sans-serif" ,color:"white"}}>
            <li>Term Of use</li>
            <li>About</li>
            <li>Privacy-Policy</li>
            <li>blog</li>
            <li>FAQ</li>
        </ul>
        <div className={classes.text}>
        It seems like you're interested in the topic of finance. Could you please 
        provide more specific information or a question related to finance that you'd 
        like to know more about? Finance is a broad field that encompasses various aspects 
        such as personal finance, corporate finance, investments, banking, and more. Clarifying your
         inquiry will help me provide you with relevant information and insights.
        </div>
      <ul>
        <li><ion-icon name="logo-facebook"></ion-icon></li>
        <li><ion-icon name="logo-instagram"></ion-icon></li>
        <li><ion-icon name="home"></ion-icon></li>
        <li><ion-icon name="logo-linkedin"></ion-icon></li>
      </ul>
    </div>
  );
};

export default Footer;
import React from 'react';
import "./footer.scss"
import logofooter from "./assets/logofooter.svg"

function Footer() {
  return (
    <>
    <footer className='footer'>
      <h1 className='h1footer'>todos os direitos resercados à: we.digi</h1>
      <a className='linkfooter' href="/">
      <img className='logofooter' src={logofooter} alt="logo footer we.digi" />
      </a>
    </footer>
    </>
  );
}

export default Footer;
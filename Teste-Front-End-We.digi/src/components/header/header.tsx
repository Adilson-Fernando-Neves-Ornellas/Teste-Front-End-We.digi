import React from 'react';
import "./header.scss"
import imgcarrinho from './assets/imgcarrinho.svg'
import imgmenu from './assets/imgMenu.svg'
import logoheader from './assets/logoheader.svg'

function Header() {
  return (
    <header className='header'>
      <div className='headermenu'>
          <button className='menubutton'>
            <img className='buttonimg' src={imgmenu} alt="Imagem Do menu" />
          </button>
      </div>

      <a className='headerlink' href="/">
        <img className='logoheader' src={logoheader} alt="Logo Header We.digi" />
      </a>

      <div className='headercarinho'>
        <button className='buttoncarrinho'>
            <img className='imgcarrinho' src={imgcarrinho} alt="Imagem do carrinho de compra " />
        </button>
      </div>
    </header>
  );
}

export default Header;
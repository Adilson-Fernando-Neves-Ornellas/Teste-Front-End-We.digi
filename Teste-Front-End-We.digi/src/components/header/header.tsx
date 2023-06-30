import React ,{useState} from 'react';
import "./header.scss"
import imgcarrinho from './assets/imgcarrinho.svg'
import imgmenu from './assets/imgMenu.svg'
import logoheader from './assets/logoheader.svg'



function Header() {
  const [active, setMode] = useState(false)

  const observaMenu = ()=>{
    setMode(!active)
  }

  const [ativado , setModo] = useState(false)

  const observaCarrinho = ()=>{
    setModo(!ativado)
  }

  return (
    <header className='header'>
      <div className='headermenu'>
          <button className='menubutton' onClick={observaMenu}>
            <img className='buttonimg' src={imgmenu} alt="Imagem Do menu" />
          </button>
      </div>

      <div className={active? 'menuAberto' : 'menuFechado'} >
        <h2 className='tituloMenu'>MENU ABERTO</h2>
        <button className='buttonfechar' onClick={observaMenu}>X</button>
      </div>

      <a className='headerlink' href="/">
        <img className='logoheader' src={logoheader} alt="Logo Header We.digi" />
      </a>

      <div className='headercarinho'>
        <button className='buttoncarrinho' onClick={observaCarrinho}>
            <img className='imgcarrinho' src={imgcarrinho} alt="Imagem do carrinho de compra " />
        </button>
      </div>

      <div className={ativado? 'carrinhoAberto' : 'carrinhoFechado'} >
        <button className='buttonfechar' onClick={observaCarrinho}>X</button>
        <h2 className='tituloCarrinho'>CARRINHO ABERTO</h2>
      </div>

    </header>
  );
}

export default Header;
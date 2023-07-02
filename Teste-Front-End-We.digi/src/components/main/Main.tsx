import React, {FormEvent, useEffect, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import "./Main.scss";
import Sublista from './sublista/sublista';

import imgaddlista from './assets/buttonaddlista.svg'
import iconlist from './assets/iconlist.svg'
import deletelist from './assets/excluirlista.svg'


type listaProps ={
    id: string;
    titulo:string;
}[];

function Main() {
  // const listasInicial=[
  //   {
  //     id:'1',
  //     titulo:'Lista de Desejos',
  //   },
  //   {
  //     id:'2',
  //     titulo:'Tarefas',
  //   },
  //   {
  //     id:'3',
  //     titulo:'Receitas',

  //   },
  // ];
  const dataLocalStorage = JSON.parse(localStorage.getItem('listas')||'[]');
  const [lista,setLista] = useState<listaProps>(dataLocalStorage);
  const [novaListaInicial,setNovaListaInicial] = useState('');

  function addNovoItem (event: FormEvent){
    event.preventDefault();
    setLista([...lista, { id: uuidV4(), titulo:novaListaInicial}]);
    setNovaListaInicial('');
  }
  function removeItem (id:string){
    setLista(lista.filter(lista=>lista.id !== id))
  }
  useEffect(()=> {
    localStorage.setItem('lista', JSON.stringify(lista));
  },[lista])

  return (
    <div className='main'>
      <div className='mainconteiner'>

      <div className='maininputbutton'>

        <input 
          className='imputmain'
          value={novaListaInicial}
          type="text" 
          placeholder='Qual lista você deseja criar?' 
          onChange={(event) => setNovaListaInicial(event.target.value)}
          />

        <button className='buttonmain' onClick={addNovoItem}>
            <img className='imgbutton' src={imgaddlista} alt="button adicionar lista" />
        </button>

        </div>  
      </div>

      <ul className='ullista'>
        <div className='ulconteiner'>
          {lista.map(listasInicial=>(
            <li className='lilista' key={listasInicial.id}>
              <div className='conteinerli'>

              <img className='iconlist' src={iconlist} alt="icon List" />
              {listasInicial.titulo}
            <button className='deleteibutton' onClick={() => removeItem(listasInicial.id)}>
              <img className='deleteicon' src={deletelist} alt="Excluir Lista" />
            </button>
              </div>
            <div className='sublistconteiner'>
              <Sublista></Sublista>
            </div>
          </li>))}
        </div>
      </ul>

    </div>
  );
}

export default Main;
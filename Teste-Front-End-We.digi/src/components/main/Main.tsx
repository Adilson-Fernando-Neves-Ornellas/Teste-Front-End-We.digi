import React, {FormEvent, useEffect, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import "./Main.scss";
import Sublista from './sublista/sublista';

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
    <div>

      <input 
       value={novaListaInicial}
       type="text" 
       placeholder='Qual lista você deseja criar?' 
       onChange={(event) => setNovaListaInicial(event.target.value)}
       />

      <button onClick={addNovoItem}>Adicionar</button>

      <ul>
        {lista.map(listasInicial=>(
        <li key={listasInicial.id}>{listasInicial.titulo}
        <button onClick={() => removeItem(listasInicial.id)}>Deletar</button>
        <div>
          <Sublista></Sublista>
        </div>
        </li>))}
      </ul>

    </div>
  );
}

export default Main;
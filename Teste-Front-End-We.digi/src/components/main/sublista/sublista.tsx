import React, {FormEvent, useEffect, useState} from 'react';
import {v4 as uuidV4} from 'uuid';
import "./sublista.scss";

type subListaProps ={
    id: string;
    titulo:string;
}[];

function Sublista() {
  const dataLocalStorage = JSON.parse(localStorage.getItem('subListas')||'[]');
  const [subLista,setsubLista] = useState<subListaProps>(dataLocalStorage);
  const [novaSubListaInicial,setNovaSubListaInicial] = useState('');

  function addNovoItem (event: FormEvent){
    event.preventDefault();
    setsubLista([...subLista, { id: uuidV4(), titulo:novaSubListaInicial}]);
    setNovaSubListaInicial('');
  }
  function removeItem (id:string){
    setsubLista(subLista.filter(subLista=>subLista.id !== id))
  }
  useEffect(()=> {
    localStorage.setItem('subLista', JSON.stringify(subLista));
  },[subLista])

  return (
    <div>

      <input 
       value={novaSubListaInicial}
       type="text" 
       placeholder='Adicione sub-itens a sua lista' 
       onChange={(event) => setNovaSubListaInicial(event.target.value)}
       />

      <button onClick={addNovoItem}>Adicionar</button>

      <ul>
        {subLista.map(subListasInicial=>(
        <li key={subListasInicial.id}>{subListasInicial.titulo}
        <button onClick={() => removeItem(subListasInicial.id)}>Deletar</button>
        </li>))}
      </ul>

    </div>
  );
}

export default Sublista;
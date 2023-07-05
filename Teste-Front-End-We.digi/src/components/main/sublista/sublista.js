import React, {useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import './sublista.scss';

import buttonadd from './assets/buttonaddsub.svg'
import buttoneditar from './assets/buttoneditar.svg'
import buttondeletar from './assets/buttonexcluir.svg'

import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';


function Sublista() {
  const dataLocalStorage = JSON.parse(localStorage.getItem('subListas') || '[]');
  const [subLista, setsubLista] = useState(dataLocalStorage);
  const [novaSubListaInicial, setNovaSubListaInicial] = useState('');
  const [idEditado, setIdEditado] = useState(''); 
  const [tituloEditado, setTituloEditado] = useState(''); 

  function addNovoItem(event) {
    event.preventDefault();
    setsubLista([...subLista, { id: uuidV4(), titulo: novaSubListaInicial }]);
    setNovaSubListaInicial('');
  }

  function editarItem(id) {
    const itemEditado = subLista.find(item => item.id === id);
    if (itemEditado) {
      setTituloEditado(itemEditado.titulo);
      setIdEditado(id);
    } else {
      setIdEditado('');
      setTituloEditado('');
    }
  }

  function salvarEdicao(id) {
    setsubLista(subLista.map(item => {
      if (item.id === id) {
        return { ...item, titulo: tituloEditado };
      }
      return item;
    }));
    setIdEditado('');
    setTituloEditado('');
  }

  function removeItem(id) {
    setsubLista(subLista.filter(subLista => subLista.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('subLista', JSON.stringify(subLista));
  }, [subLista]);

 
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(subLista);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setsubLista(items);
  }


  return (
    <div className='subconteiner'>
      <form onSubmit={addNovoItem} className='conteinerinput'>
        <input
          className='inputsublist'
          value={novaSubListaInicial}
          type="text"
          placeholder="Adicione sub-itens a sua lista"
          onChange={event => setNovaSubListaInicial(event.target.value)}
        />

        <button className='buttonaddsub' onClick={addNovoItem} type='submit'>
          <img className='imgbuttonadd' src={buttonadd} alt="button adicionar" />
        </button>
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='subLista'>
          {(provided) => (
            <div className='ulconteiner'>
              <ul className='subLista' {...provided.droppableProps} ref={provided.innerRef}>
                {provided.placeholder}
                {subLista.map((subListasInicial, index)=> (
                  <Draggable key={subListasInicial.id} draggableId={subListasInicial.id} index={index}>
                    {(provided) => (
                      <li className='lisublista' key={subListasInicial.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}>
                        {subListasInicial.id === idEditado ? (
                          <form className='formEditar' onSubmit={() => salvarEdicao(subListasInicial.id)}>
                            <input
                              className='imputedit'
                              type="text"
                              value={tituloEditado}
                              onChange={event => setTituloEditado(event.target.value)}
                              />
                            <button className='buttonsalvaredit' onClick={() => salvarEdicao(subListasInicial.id)} type='submit'>Salvar</button>
                          </form>
                        ) : (
                          <>
                            {subListasInicial.titulo}
                            <button className='buttoneditarisublist' onClick={() => editarItem(subListasInicial.id)}>
                              <img className='imgbuttoneditar' src={buttoneditar} alt="Editar Item Sub Lista" />

                            </button>
                          </>
                        )}
                        <div className='conteinerdeletarsubitem'>
                          <button className='deletarsublist' onClick={() => removeItem(subListasInicial.id)}>
                            <img className='imgbuttondeletar' src={buttondeletar} alt="Excluir item sub Lista" />
                          </button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
}

export default Sublista;


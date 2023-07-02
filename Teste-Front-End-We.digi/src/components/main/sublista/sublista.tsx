import React, { FormEvent, useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import './sublista.scss';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type subListaProps = {
  id: string;
  titulo: string;
}[];

function Sublista() {
  const dataLocalStorage = JSON.parse(localStorage.getItem('subListas') || '[]');
  const [subLista, setsubLista] = useState<subListaProps>(dataLocalStorage);
  const [novaSubListaInicial, setNovaSubListaInicial] = useState('');
  const [idEditado, setIdEditado] = useState<string>(''); 
  const [tituloEditado, setTituloEditado] = useState<string>(''); 

  function addNovoItem(event: FormEvent) {
    event.preventDefault();
    setsubLista([...subLista, { id: uuidV4(), titulo: novaSubListaInicial }]);
    setNovaSubListaInicial('');
  }

  function editarItem(id: string) {
    const itemEditado = subLista.find(item => item.id === id);
    if (itemEditado) {
      setTituloEditado(itemEditado.titulo);
      setIdEditado(id);
    } else {
      setIdEditado('');
      setTituloEditado('');
    }
  }

  function salvarEdicao(id: string) {
    setsubLista(subLista.map(item => {
      if (item.id === id) {
        return { ...item, titulo: tituloEditado };
      }
      return item;
    }));
    setIdEditado('');
    setTituloEditado('');
  }

  function removeItem(id: string) {
    setsubLista(subLista.filter(subLista => subLista.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('subLista', JSON.stringify(subLista));
  }, [subLista]);

 
  function onDragEnd() {
    // TODO: Implement the logic to handle the drag and drop event.
    // For example, reorder the list based on the result provided.
  }


  return (
    <div>
      <input
        value={novaSubListaInicial}
        type="text"
        placeholder="Adicione sub-itens a sua lista"
        onChange={event => setNovaSubListaInicial(event.target.value)}
      />

      <button onClick={addNovoItem}>Adicionar</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={novaSubListaInicial}>
          {(provided) => (
            <ul className='ulsublista' {...provided.droppableProps} ref={provided.innerRef}>
               {provided.placeholder}
              {subLista.map((subListasInicial, index)=> (
                <Draggable key={subListasInicial.id} draggableId={subListasInicial.id} index={index}>
                  {(provided) => (
                    <li key={subListasInicial.id}
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                      {subListasInicial.id === idEditado ? (
                        <>
                          <input
                            type="text"
                            value={tituloEditado}
                            onChange={event => setTituloEditado(event.target.value)}
                            />
                          <button onClick={() => salvarEdicao(subListasInicial.id)}>Salvar</button>
                        </>
                      ) : (
                        <>
                          {subListasInicial.titulo}
                          <button onClick={() => editarItem(subListasInicial.id)}>Editar</button>
                        </>
                      )}
                      <button onClick={() => removeItem(subListasInicial.id)}>Deletar</button>
                    </li>
                   )}
                </Draggable>
              ))}
            </ul>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
}

export default Sublista;


import html from "./index.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPending } from "./use-cases";

//localStorage se guarda la info siempre en string JSON recomendado.

//localStorage -> persistente, en la app { creo que hasta que muera el hosting }
//sessionStorage -> igual, pero si cierran el navegador web se pierde

//recordar que tiene cierta limitante de espacio.
//en local storage se puede guardar 50MB aprox dependiendo del navegador, las cookies menos de 1MB.
//Las cockies envían información a las peticiones HTTP, para poder personalizar respuestas con base en la información de las cookies





const ElementIDs = {
  TodoList: '.todo-list'
  , NewTodoInput: '#new-todo-input'
  , ClearCompletedButton: '.clear-completed'
  , TodoFilters: '.filtro'
  , PendingCountLabel: '#pending-count'
}

const keyCodes = {
  Enter: 13
}

export const App = ( elementId ) => {
  
  const displayTodos = () => {
    const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
    renderTodos( ElementIDs.TodoList, todos );
    updatePendingCount();
  }

  const updatePendingCount = () => {
    renderPending( ElementIDs.PendingCountLabel );
  }
  
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector( elementId ).append( app );

    displayTodos();
  })();

  //Es necesario crear este código luego de la función autoinvocada
  const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
  const todoListUL = document.querySelector( ElementIDs.TodoList );
  const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
  const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );


  newDescriptionInput.addEventListener( 'keyup', ( event ) => {
    //el return saca del evento
    if ( event.keyCode !== keyCodes.Enter ) { return; }
    if ( event.target.value.trim().length === 0 ) { return; }

    todoStore.addTodo( event.target.value );
    displayTodos();

    event.target.value = '';
  });

  todoListUL.addEventListener( 'click', ( event ) => {
    //Busca el padre mas cercano que tenga data-id
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo( element.getAttribute('data-id') )
    displayTodos();
  });

  todoListUL.addEventListener( 'click', ( event ) => {
    const isDestroyElement = event.target.className === 'destroy';
    const element = event.target.closest('[data-id]');

    if ( !element || !isDestroyElement ) { return; }

    todoStore.deleteTodo( element.getAttribute('data-id') );
    displayTodos();
  });

  clearCompletedButton.addEventListener( 'click', ( event ) => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  //Para el caso de variables iguales dentro del scope, toma el valor del mas interno, en el caso no exista retrocede un nivel, por ejemplo

  // for (let index = 0; index < array.length; index++) {
  //   for (let index = 0; index < array.length; index++) {
  //   }
  // }

  //Hay 2 variables index, primero hace caso al interno y si no existe pasa al externo y así sucesivamente.

  filtersLIs.forEach( li => {
    
    li.addEventListener( 'click', ( element ) => {
      filtersLIs.forEach( item => { item.classList.remove('selected'); });
      element.target.classList.add( 'selected' );

      switch ( element.target.text ) {
        case 'Todos':
            todoStore.setFilter( Filters.All );
          break;
        case 'Pendientes':
            todoStore.setFilter( Filters.Pending );
          break;
        case 'Completados':
            todoStore.setFilter( Filters.Completed );
          break;
      }

      displayTodos();

    })

  });

}


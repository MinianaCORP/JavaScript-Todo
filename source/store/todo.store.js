import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: 'All'
  , Completed: 'Completed'
  , Pending: 'Pending'
}

const state = {
  todos: [
    new Todo('Gema del espacio')
    , new Todo('Gema de la mente')
    , new Todo('Gema del alma')
    , new Todo('Gema de la realidad')
    , new Todo('Gema del tiempo')
    , new Todo('Gema del poder')
  ]
  , filter: Filters.All
}

const initStore = () => {
  loadStore();
  console.log('InitStore');
}

const loadStore = () => {
  if ( !localStorage.getItem( 'state' ) ) { return; }

  const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem( 'state' ) );

  state.todos = todos;
  state.filter = filter;
}

const getTodos = ( filter = Filters.All ) => {
  switch ( filter ) {
    case Filters.All:
      return [...state.todos]; //Aqui regresa un nuevo objeto, necesitamos hacerlo, dado que, siempre los objetos se pasan por referencia

    case Filters.Completed:
      return state.todos.filter( todo => todo.done );

    case Filters.Pending:
      return state.todos.filter( todo => !todo.done );

  
    default:
      throw new Error( `Option ${ filter } is not valid.` );
  }
}

const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify( state ));
}

const addTodo = ( description ) => {
  // undefined, null or false
  if ( !description )  { throw new Error( 'Description is required' ); }
  state.todos.push( new Todo( description ) );
  saveStateToLocalStorage();
}

const toggleTodo = ( todoId ) => {
  //Esto solo se utiliza para objetos con pocos registros, dado que, recorre todo el objeto para cambiar solo uno.
  //Para casos con varios registros, se necesitará identificar el id y actualizar solo ese;
  state.todos = state.todos.map( todo => {
    if ( todo.id === todoId ) {
      todo.done = !todo.done;
    }
    return todo;
  });
  saveStateToLocalStorage();
}

const deleteTodo = ( todoId ) => {
  state.todos = state.todos.filter( todo => todo.id !== todoId );
  saveStateToLocalStorage();
}

const deleteCompleted = () => {
  state.todos = state.todos.filter( todo => !todo.done );
  saveStateToLocalStorage();
}

const setFilter = ( newFilter = Filters.All ) => {
  state.filter = newFilter;
  saveStateToLocalStorage();
}

const getCurrentFilter = () => {
  return state.filter;
}


export default {
  initStore
  , loadStore
  , getTodos
  , addTodo
  , toggleTodo
  , deleteTodo
  , deleteCompleted
  , setFilter
  , getCurrentFilter
}
import todoStore from './source/store/todo.store';
import { App } from './source/todos/app'
import './style.css'

todoStore.initStore();


App('#app');
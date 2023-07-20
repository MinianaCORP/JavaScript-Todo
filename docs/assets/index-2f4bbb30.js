(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const p of n.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();let w;const C=new Uint8Array(16);function L(){if(!w&&(w=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!w))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return w(C)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function S(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:E};function A(e,t,i){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||L)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return S(d)}class u{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"All",Completed:"Completed",Pending:"Pending"},l={todos:[new u("Gema del espacio"),new u("Gema de la mente"),new u("Gema del alma"),new u("Gema de la realidad"),new u("Gema del tiempo"),new u("Gema del poder")],filter:c.All},P=()=>{v(),console.log("InitStore")},v=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},k=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},f=()=>{localStorage.setItem("state",JSON.stringify(l))},I=e=>{if(!e)throw new Error("Description is required");l.todos.push(new u(e)),f()},U=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},D=()=>{l.todos=l.todos.filter(e=>!e.done),f()},O=(e=c.All)=>{l.filter=e,f()},q=()=>l.filter,a={initStore:P,loadStore:v,getTodos:k,addTodo:I,toggleTodo:U,deleteTodo:x,deleteCompleted:D,setFilter:O,getCurrentFilter:q},F=`<section class="todoapp">\r
  <header class="header">\r
    <h1>Tareas</h1>\r
    <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>\r
  </header>\r
  \r
  <!-- This section should be hidden by default and shown when there are todos -->\r
  <section class="main">\r
    <input id="toggle-all" class="toggle-all" type="checkbox">\r
    <label for="toggle-all">Mark all as complete</label>\r
    <ul class="todo-list">\r
      <!-- These are here just to show the structure of the list items -->\r
      <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->\r
      <!-- <li class="completed" data-id="abc">\r
        <div class="view">\r
          <input class="toggle" type="checkbox" checked>\r
          <label>Probar JavaScript</label>\r
          <button class="destroy"></button>\r
        </div>\r
        <input class="edit" value="Create a TodoMVC template">\r
      </li> -->\r
      <!-- <li>\r
        <div class="view">\r
          <input class="toggle" type="checkbox">\r
          <label>Comprar un unicornio</label>\r
          <button class="destroy"></button>\r
        </div>\r
          <input class="edit" value="Rule the web">\r
      </li> -->\r
    </ul>\r
  </section>\r
\r
  <!-- This footer should hidden by default and shown when there are todos -->\r
  <footer class="footer">\r
    <!-- This should be "0 items left" by default -->\r
    <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>\r
    <!-- Remove this if you don't implement routing -->\r
    <ul class="filters">\r
      <li>\r
        <!-- selected -->\r
        <a class="filtro" class="selected" href="#/">Todos</a>\r
      </li>\r
      <li>\r
        <a class="filtro" href="#/active">Pendientes</a>\r
      </li>\r
      <li>\r
        <a class="filtro" href="#/completed">Completados</a>\r
      </li>\r
    </ul>\r
    <!-- Hidden if no completed items are left ↓ -->\r
    <button class="clear-completed">Borrar completados</button>\r
  </footer>\r
</section>\r
\r
\r
<footer class="info">\r
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>\r
  <!-- Change this out with your name and url ↓ -->\r
  <p>Creado por <a href="http://todomvc.com">ti</a></p>\r
  <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>\r
</footer>`;let b;const M=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error(`Element ${e} not found`);b.innerHTML=a.getTodos(c.Pending).length},N=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:i,id:d}=e,o=`
    <div class="view">
      <input class="toggle" type="checkbox" ${t?"checked":""}>
      <label> ${i} </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",d),t&&n.classList.add("completed"),n};let g;const H=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(i=>{g.append(N(i))})},h={TodoList:".todo-list",NewTodoInput:"#new-todo-input",ClearCompletedButton:".clear-completed",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},V={Enter:13},G=e=>{const t=()=>{const r=a.getTodos(a.getCurrentFilter());H(h.TodoList,r),i()},i=()=>{M(h.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=F,document.querySelector(e).append(r),t()})();const d=document.querySelector(h.NewTodoInput),o=document.querySelector(h.TodoList),n=document.querySelector(h.ClearCompletedButton),p=document.querySelectorAll(h.TodoFilters);d.addEventListener("keyup",r=>{r.keyCode===V.Enter&&r.target.value.trim().length!==0&&(a.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const m=r.target.closest("[data-id]");a.toggleTodo(m.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const m=r.target.className==="destroy",y=r.target.closest("[data-id]");!y||!m||(a.deleteTodo(y.getAttribute("data-id")),t())}),n.addEventListener("click",r=>{a.deleteCompleted(),t()}),p.forEach(r=>{r.addEventListener("click",m=>{switch(p.forEach(y=>{y.classList.remove("selected")}),m.target.classList.add("selected"),m.target.text){case"Todos":a.setFilter(c.All);break;case"Pendientes":a.setFilter(c.Pending);break;case"Completados":a.setFilter(c.Completed);break}t()})})};a.initStore();G("#app");

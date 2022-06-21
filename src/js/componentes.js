import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
   const htmlTodo = `
   <li class=" ${todo.completado ? 'completed' : ' '}" data-id="${todo.id}">
   <div class="view">
      <input class="toggle" type="checkbox" ${
         todo.completado ? 'checked' : ' '
      }>
      <label>${todo.tarea}</label>
      <button class="destroy"></button>
   </div>
   <input class="edit" value="Create a TodoMVC template">
   </li>`;

   const div = document.createElement('div');
   div.innerHTML = htmlTodo;

   divTodoList.append(div.firstElementChild);

   return div.firstElementChild;
};

// Eventos

/* Añadir un todo al array */
txtInput.addEventListener('keyup', (event) => {
   if (event.keyCode === 13 && txtInput.value.length > 0) {
      const nuevoTodo = new Todo(txtInput.value);
      todoList.nuevoTodo(nuevoTodo);

      crearTodoHtml(nuevoTodo);
      txtInput.value = '';
   }
});

// En donde dá click
divTodoList.addEventListener('click', (event) => {
   const nombreElemento = event.target.localName; //Referencia al valor que se hace click (input, label, button)
   const todoElemento = event.target.parentElement.parentElement; // Referencia al li, ya que cuando se toca la X se tiene que destruir el elemento HTML
   const todoId = todoElemento.getAttribute('data-id'); // Obtener el id del todo

   if (nombreElemento.includes('input')) {
      // Click en el checkbox de el input del todo
      todoList.marcarCompletado(todoId);
      todoElemento.classList.toggle('completed');
   } else if (nombreElemento.includes('button')) {
      // Click en el botón de eliminar el todo
      todoList.eliminarTodo(todoId); // Eliminar el todo del array, pero aún existe la referencia HTML
      divTodoList.removeChild(todoElemento); // Eliminar el todo del HTML que coincida con el todoElemento
   }
});

// Botón eliminar todos completados
btnBorrar.addEventListener('click', () => {
   for (let i = divTodoList.children.length - 1; i >= 0; i--) {
      const elemento = divTodoList.children[i];

      if (elemento.classList.contains('completed')) {
         divTodoList.removeChild(elemento);
      }
   }
});

/* A function that is being called when the user clicks on the filter buttons. */
ulFiltros.addEventListener('click', (evento) => {
   const filtro = evento.target.textContent; // Obtener el texto del elemento que se hace click

   anchorFiltros.forEach((elem) => elem.classList.remove('selected')); // Remover la clase selected de todos los elementos
   evento.target.classList.add('selected'); // Añadir la clase selected al elemento que se hace click

   if (!filtro) {
      // Si no hay texto, no se hace nada
      return;
   }

   for (const elemento of divTodoList.children) {
      elemento.classList.remove('hidden'); // Eliminar la clase hidden de todos los elementos
      const completado = elemento.classList.contains('completed'); // Verificar si el elemento está completado

      switch (
         filtro // Switch para verificar el filtro (completado, pendientes, todos)
      ) {
         case 'Pendientes': // Doy click en pendientes y si los elementos estan completados, los oculto
            if (completado) {
               elemento.classList.add('hidden');
            }
            break;
         case 'Completados': // Doy click en completados y si los elementos no estan completados, los oculto
            if (!completado) {
               elemento.classList.add('hidden');
            }
            break;
      }
   }
});

import { Todo } from './todo.class';

export class TodoList {
   constructor() {
      this.cargarLocalStorage();
   }

   //  Métodos
   nuevoTodo(todo) {
      this.todos.push(todo);
      this.guardarLocalStorage();
   }

   eliminarTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id != id); // Regresa un nuevo arreglo, con todos los elementos, excepto el que contenga el id que se paso por parametro
      this.guardarLocalStorage();
   }

   marcarCompletado(id) {
      for (const todo of this.todos) {
         if (todo.id == id) {
            todo.completado = !todo.completado;
            this.guardarLocalStorage();
            break;
         }
      }
   }

   eliminarCompletados() {
      this.todos = this.todos.filter((todo) => !todo.completado); // Regresa un array con todos los todo que no están completados (.filtrar)
      this.guardarLocalStorage();
   }

   // Método para guardar en el localStorage
   /**
    * It takes the todos array and converts it to a string using JSON.stringify() and then saves it to
    * localStorage using localStorage.setItem().
    */
   guardarLocalStorage() {
      localStorage.setItem('todo', JSON.stringify(this.todos));
   }

   // Método para obtener los todos del localStorage
   /**
    * If there is an item in localStorage called 'todo', then parse it and set it to the todos array,
    * otherwise set the todos array to an empty array.
    */
   cargarLocalStorage() {
      this.todos = localStorage.getItem('todo')
         ? JSON.parse(localStorage.getItem('todo'))
         : [];
      this.todos = this.todos.map((obj) => Todo.fromJson(obj));
      // this.todos = this.todos.map(Todo.fromJson);
   }
}

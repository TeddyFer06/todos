export class Todo {
   /**
    * The function takes an object as an argument, creates a new instance of the Todo class, and then
    * assigns the values of the object to the new instance.
    *
    * The function is called in the following way:
    * @returns A new instance of Todo with the properties of the object passed in.
    */
   static fromJson({ id, tarea, completado, creado }) {
      //
      const tempTodo = new Todo(tarea); //Crea una instancia de Todo

      tempTodo.id = id;
      tempTodo.completado = completado;
      tempTodo.creado = creado;

      return tempTodo;
   }

   constructor(tarea) {
      this.tarea = tarea;

      this.id = new Date().getTime();
      this.completado = false;
      this.creado = new Date();
   }

   imprimirClase() {
      console.log(`${this.tarea} - ${this.id}`);
   }
}

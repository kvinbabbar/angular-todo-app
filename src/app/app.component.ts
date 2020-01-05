import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  newTodo: Todo = new Todo();

  constructor(private todoService: TodoDataService) {

  }

  addTodo() {
      if(this.newTodo.title) {
        this.todoService.addTodo(this.newTodo);
        this.newTodo = new Todo();
      }
  }

  toggleTodoComplete(todo: Todo) {
    this.todoService.toggleTodoComplete(todo);
  }

  removeTodo(todo: Todo) {
    this.todoService.deleteTodoById(todo.id);
  }
  
  get todos() {
    return this.todoService.getAllTodos();
  }
}

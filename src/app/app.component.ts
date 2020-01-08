import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private todoService: TodoDataService) {

  }

  addNewTodo(todo: Todo) {
    this.todoService.addTodo(todo);
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

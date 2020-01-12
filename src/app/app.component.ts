import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoDataService) {

  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getAllTodos()
      .subscribe(data => {
        this.todos = data;
      },
      err => console.error("GetTodos",err)
      )
  }

  addNewTodo(todo: Todo) {
    this.todoService.addTodo(todo)
      .subscribe(todo => {
        this.todos.push(todo);
      },
      err => console.error("addNewTodo",err)
      )
  }

  toggleTodoComplete(todo: Todo) {
    this.todoService.toggleTodoComplete(todo)
      .subscribe( (updatedTodo) => {
        todo = updatedTodo;},
        err => console.error("toggleTodoComplete",err)
      )
  }

  removeTodo(todo: Todo) {
    this.todoService.deleteTodoById(todo)
      .subscribe(_ => {
        this.todos = this.todos.filter(t => t.id !== todo.id)
      },
      err => console.error("removeTodo",err)
      )
  }
  
}

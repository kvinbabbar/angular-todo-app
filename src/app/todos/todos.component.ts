import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map } from 'rxjs/operators';

import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoDataService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    this.route.data.pipe(
      map(data => data['todos'])
    ).subscribe(todos => {
        this.todos = todos;
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

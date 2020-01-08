import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from "../todo";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input()
  todos: Todo[];

  @Output()
  removeTodo: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeThisTodo(todo: Todo) {
    this.removeTodo.emit(todo);
  }
}

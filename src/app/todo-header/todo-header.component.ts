import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from "../todo";

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.scss']
})
export class TodoHeaderComponent {

  newTodo: Todo = new Todo();

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  addTodo() {
    if(this.newTodo.title) {
      this.add.emit(this.newTodo);
      this.newTodo = new Todo();
    }
  }

}

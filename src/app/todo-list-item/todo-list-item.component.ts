import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo'

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {
  @Input()
  todo: Todo;

  @Output()
  removeTodoItem: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleCompleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleTodoComplete(todo: Todo) {
    this.toggleCompleteTodo.emit(todo);
  }

  removeThisTodo(todo: Todo) {
    this.removeTodoItem.emit(todo);
  }

}

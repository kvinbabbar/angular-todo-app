import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private api: ApiService) { }

  addTodo(todo: Todo): Observable<Todo> {
    return this.api.addTodo(todo);
  }

  deleteTodoById(todo: Todo): Observable<Todo> {
    return this.api.deleteTodoById(todo);
  }

  updateTodoById(todo: Todo): Observable<Todo> {
    return this.api.updateTodoById(todo);
  }

  getAllTodos(): Observable<Todo[]> {
    return this.api.getAllTodos();
  }

  getTodoById(id: number): Observable<Todo> {
    return this.api.getTodoById(id);
  }  

  toggleTodoComplete(todo: Todo): Observable<Todo> {
    todo.complete = !todo.complete;
    return this.api.updateTodoById(todo);
  }
}

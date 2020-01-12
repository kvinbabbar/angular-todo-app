import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private apiUrl = `${environment.apiUrl}/todos`;

  constructor(private http: HttpClient) {
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl)
      .pipe(
        catchError(err => throwError(err))
      )
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo, this.httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err)
        })
      )
  }

  updateTodoById(todo: Todo): Observable<any> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put(url, todo, this.httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err)
        })
      )
  }

  deleteTodoById(todo: Todo): Observable<Todo> {
    const id = typeof todo === "number" ? todo : todo.id;
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err)
        })
      )
  }

  getTodoById(id: number): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Todo>(url)
      .pipe(
        catchError(err => {
          return throwError(err)
        })
      )
  }

}
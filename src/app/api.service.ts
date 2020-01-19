import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, throwError, of } from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators';

import { SessionService } from './auth/session.service';
import { environment } from '../environments/environment';
import { Todo } from './todo';
import { Token } from './token';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient, private session: SessionService) {
  }

  signIn(username: string, password: string) {
    return this.http.post<Token>(this.apiUrl + '/sign-in', {
      username,
      password
    })
    .pipe(
      catchError(this.errorHandler('signIn'))
    )
  }
  
  getAllTodos(): Observable<Todo[]> {
    const options = this.gethttpOptions();
    return this.http.get<Todo[]>(this.apiUrl + '/todos', options)
      .pipe(
        catchError(this.errorHandler<Todo[]>("getAllTodos", []))
      )
  }

  addTodo(todo: Todo): Observable<Todo> {
    const options = this.gethttpOptions();    
    return this.http.post<Todo>(this.apiUrl + '/todos', todo, options)
      .pipe(
        catchError(this.errorHandler<Todo>("addTodo"))
      )
  }

  updateTodoById(todo: Todo): Observable<any> {
    const options = this.gethttpOptions();
    const url = `${this.apiUrl + '/todos'}/${todo.id}`;
    return this.http.put(url, todo, options)
      .pipe(
        catchError(this.errorHandler<Todo>("updateTodoById"))
      )
  }

  deleteTodoById(todo: Todo): Observable<Todo> {
    const id = typeof todo === "number" ? todo : todo.id;
    const url = `${this.apiUrl + '/todos'}/${id}`;
    const options = this.gethttpOptions();
    
    return this.http.delete<Todo>(url, options)
      .pipe(
        catchError(this.errorHandler<Todo>("deleteTodoById"))
      )
  }

  getTodoById(id: number): Observable<Todo> {
    const options = this.gethttpOptions();
    const url = `${this.apiUrl + '/todos'}/${id}`;
    return this.http.get<Todo>(url, options)
      .pipe(
        catchError(this.errorHandler<Todo>("getTodoById"))
      )
  }

  private errorHandler<T>(operation = "Operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
  
  private gethttpOptions() {
    return {
      headers: new HttpHeaders().set('authorization', `Bearer ${this.session.accessToken}`)
    };
  }
}

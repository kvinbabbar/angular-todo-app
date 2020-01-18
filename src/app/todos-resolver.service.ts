import { Injectable } from '@angular/core';
import {Router, 
        ActivatedRouteSnapshot, 
        RouterStateSnapshot,
        Resolve} from '@angular/router';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodosResolverService implements Resolve<Observable<Todo[]>> {

  constructor(private todo: TodoDataService, router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todo[]> {
    return this.todo.getAllTodos();
  }
}

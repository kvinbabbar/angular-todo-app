import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosResolverService } from './todos-resolver.service';
import { SignInGuard } from './guards/sign-in.guard';

import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { Todo } from './todo';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [
      SignInGuard
    ],
    resolve: {
      todos: TodosResolverService
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

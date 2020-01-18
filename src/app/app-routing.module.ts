import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosResolverService } from './todos-resolver.service';

import { TodosComponent } from './todos/todos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos'
  },
  {
    path: 'todos',
    children: [
      {
        path: '',
        component: TodosComponent,
        resolve: {
          todos: TodosResolverService
        }
      },
      {
        path: ':id',
        component: TodosComponent
      }
    ]
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

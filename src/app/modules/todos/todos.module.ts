import {NgModule} from '@angular/core';
import {ListComponent} from './list.component';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {AddTemplateDrivenComponent} from './add-template-driven.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddReactiveComponent} from './add-reactive.component';
import {EditLongComponent} from './edit-long.component';
import {TodoResolver} from '../../resolver/todo.resolver';
import {EditComponent} from './edit.component';
import {TodoFormComponent} from './todo-form.component';

const routes = [
  {path: '', component: ListComponent},
  {path: 'add-template', component: AddTemplateDrivenComponent},
  {path: 'add', component: AddReactiveComponent},
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: {
      todo: TodoResolver
    }
  }
] as Route[];


@NgModule({
  declarations: [
    ListComponent,
    AddTemplateDrivenComponent,
    AddReactiveComponent,
    EditLongComponent,
    EditComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TodosModule {

}

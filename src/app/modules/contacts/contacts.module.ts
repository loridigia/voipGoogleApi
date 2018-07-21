import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {ListComponent} from './list.component';
import {CommonModule} from '@angular/common';

const routes: Route[] = [
  {path: '', component: ListComponent}
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactsModule {

}

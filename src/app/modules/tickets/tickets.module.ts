import {ModuleWithProviders, NgModule} from '@angular/core';
import {ListComponent} from './list.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

const routes = [
  {path: '', component: ListComponent}
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TicketsModule {


}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BgDirective} from './bg.directive';

@NgModule({
  declarations: [
    BgDirective
  ],
  exports: [
    BgDirective,
    BrowserModule
  ],
  imports: [
    BrowserModule
  ]
})
export class SharedModule{

}

import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDirBg]'
})
export class BgDirective {

  public constructor(private el: ElementRef) {
    (el.nativeElement as HTMLElement).style.backgroundColor = 'red';
  }
  
}

import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TodoFormHelper} from './todo-form.helper';
import {Todo} from '../../app.types';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-todo-form',
  template: `
    <ng-content></ng-content>
    <form [formGroup]="form" novalidate (ngSubmit)="doSubmit()" *ngIf="form">
      <div>Title:</div>
      <div><input placeholder="title" formControlName="title"/></div>
      <div *ngIf="!form.get('title').valid">Insert a title!</div>
      <div>Completed:</div>
      <div><input type="checkbox" formControlName="completed"/></div>
      <div>
        <button type="submit"
                [disabled]="!form.valid">Save
        </button>
      </div>
    </form>
  `
})
export class TodoFormComponent implements OnInit {

  @Input() todo: Todo = null;
  @Output() completed: EventEmitter<Todo> = new EventEmitter<Todo>();

  public form: FormGroup;
  private fh: TodoFormHelper;

  public constructor(private fb: FormBuilder) {
    this.fh = new TodoFormHelper(this.fb);
  }

  public ngOnInit(): void {
    this.form = this.fh.getForm(this.todo);
  }

  public doSubmit() {

    if (!this.form.valid) {
      return;
    }

    this.completed.emit(this.form.value as Todo);
  }

}

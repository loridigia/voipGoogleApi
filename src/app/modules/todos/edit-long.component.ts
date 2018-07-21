import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Todo} from '../../app.types';
import {TodoFormHelper} from './todo-form.helper';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-todos-edit-long',
  template: `
    <div *ngIf="!form">loading...</div>
    <div *ngIf="form">
      <h3>Edit Todo {{ todo.title }}</h3>
      <form [formGroup]="form" novalidate (ngSubmit)="doSubmit()">
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
    </div>
  `
})
export class EditLongComponent implements OnInit {

  public form: FormGroup;
  private todo: Todo;
  private fh: TodoFormHelper;

  public constructor(
    private router: Router,
    private todoService: TodoService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.fh = new TodoFormHelper(this.fb);
  }

  public ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.todoService.getById(id).then((todo) => {
        this.todo = todo;
        this.form = this.fh.getForm(this.todo);
      });
    });

  }

  public doSubmit() {
    if (!this.form.valid) {
      console.log('Form invalid!');
      return;
    }

    this.todoService.edit(this.fh.getModel(this.form)).then((todo) => {
      console.log('Updated todo with id ' + todo.id);
      this.router.navigate(['/todos']);

    })
      .catch((err) => console.log(err));
  }


}

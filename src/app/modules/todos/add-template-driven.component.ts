import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Todo} from '../../app.types';
import {TodoService} from '../../services/todo.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-todos-add-driven',
  template: `
    <h3>Created new Todo</h3>
    <form #f="ngForm" (ngSubmit)="doSubmit()">
      <div>Title:</div>
      <div><input placeholder="title" name="title" [(ngModel)]="todo.title" required/></div>
      <div>Completed:</div>
      <div><input type="checkbox" name="completed" [(ngModel)]="todo.completed"/></div>
      <div>
        <button type="submit" [disabled]="!f.valid">Save</button>
        {{ f.value.title }} - {{ f.value.completed }}<br>
        {{ todo.title }} - {{ todo.completed }}
      </div>
    </form>
  `
})
export class AddTemplateDrivenComponent implements OnInit {

  public todo: Todo = {completed: false, userId: 1};

  public constructor(private todoService: TodoService) {
  }

  public ngOnInit(): void {
  }

  public doSubmit() {
    this.todoService.post(this.todo).then((created) => {
      console.log('created todo with id ' + created.id);
    })
      .catch((err) => console.log(err));
  }

}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../app.types';

const swal = require('sweetalert');

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-todos-edit',
  template: `
    <ng-container></ng-container>
    <app-todo-form [todo]="todo" (completed)="onCompleted($event)">
      <h3>Edit Todo {{ todo.title }}</h3>
    </app-todo-form>
  `
})
export class EditComponent implements OnInit {

  public todo: Todo;

  public constructor(
    private router: Router,
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.todo = this.route.snapshot.data['todo'];
  }

  public onCompleted(todo: Todo) {

    this.todoService.edit(todo).then((edited) => {
      console.log('Updated todo with id ' + edited.id);
      swal('Todo edited!', 'The todo has been changed successfully', 'success');
      this.router.navigate(['/todos']);

    })
      .catch((err) => console.log(err));

    /*if (!this.form.valid) {
      console.log('Form invalid!');
      return;
    }

    this.todoService.edit(this.fh.getModel(this.form)).then((todo) => {
      console.log('Updated todo with id ' + todo.id);
      this.router.navigate(['/todos']);

    })
      .catch((err) => console.log(err));*/
  }


}

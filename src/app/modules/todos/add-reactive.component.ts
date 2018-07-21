import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TodoService} from '../../services/todo.service';
import {TodoFormHelper} from './todo-form.helper';
import {Router} from '@angular/router';
import {Todo} from '../../app.types';
import {ToasterService} from 'angular2-toaster';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-todos-add-reactive',
  template: `
    <h3>Created new Todo</h3>
    <app-todo-form (completed)="onCompleted($event)"></app-todo-form>
  `
})
export class AddReactiveComponent implements OnInit {

  public title: FormControl;

  public constructor(private router: Router,
                     private todoService: TodoService,
                     private toasterService: ToasterService) {
  }

  public ngOnInit(): void {

    // title
    // completed
    // id
    // userId

    /*
    const title = new FormControl('', Validators.required);
    const completed = new FormControl(true, Validators.required);

    this.form = new FormGroup({
      title: title,
      completed: completed,
      id: new FormControl(''),
      userId: new FormControl(1)
    });
    */
    /*
        this.form = this.fb.group({
          title: ['', [Validators.required, (c: AbstractControl): ValidationErrors | null => {
            if (c.value === 'prova') {
              return {invalidname: true};
            }

            return null;
          }]],
          completed: [false, Validators.required],
          id: '',
          userId: 1
        });


        // title.valueChanges.subscribe((value) => console.log('new value is: ' + value));
        */

   /* this.form = this.fh.getForm();

    this.title = this.form.get('title') as FormControl;
    this.title.valueChanges.subscribe((value) => console.log('new value is: ' + value));
    this.form.statusChanges.subscribe((value) => console.log('form is valid ? ' + value));
*/
  }

  public onCompleted(todo: Todo) {

    this.todoService.post(todo).then((created) => {
      console.log('created todo with id ' + created.id);
      this.toasterService.pop('success', 'Todo created!', 'Todo created successfully');
      this.router.navigate(['/todos']);

    })
      .catch((err) => console.log(err));

  /*  if (!this.form.valid) {
      console.log('Form invalid!');
      return;
    }

    this.todoService.post(this.fh.getModel(this.form)).then((created) => {
      console.log('created todo with id ' + created.id);
      this.router.navigate(['/todos']);

    })
      .catch((err) => console.log(err));
      */
  }

}

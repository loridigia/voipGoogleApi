import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../../app.types';

export class TodoFormHelper {

  public constructor(private fb: FormBuilder) {
  }

  public getForm(todo?: Todo): FormGroup {

    const rtodo: Todo = todo || {};

    return this.fb.group({
      id: rtodo.id || '',
      userId: rtodo.userId || 1,
      title: [rtodo.title || '', Validators.required],
      completed: [rtodo.completed || false, Validators.required]
    });
  }

  public getModel(form: FormGroup): Todo {
    return form.value as Todo;
  }

}

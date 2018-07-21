import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Todo} from '../app.types';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {TodoService} from '../services/todo.service';

@Injectable()
export class TodoResolver implements Resolve<Todo> {

  public constructor(private todoService: TodoService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Todo> | Promise<Todo> | Todo {

    const id = route.params['id'];

    return this.todoService.getById(id);
  }


}

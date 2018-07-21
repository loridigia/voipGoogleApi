import {Todo} from '../app.types';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {

  private baseUri = environment.backendUrl;

  private todos: Todo[] = [];

  public constructor(private http: HttpClient) {
  }

  public list(): Promise<Todo[]> {

    if (this.todos.length > 0) {
      return Promise.resolve(this.todos);
    }

    const url = this.baseUri + '/todos';

    return new Promise((resolve) => {
      this.http.get<Todo[]>(url).toPromise().then((result) => {
        this.todos = result;
        resolve(this.todos);
      });
    });
  }

  public getById(id: number): Promise<Todo> {
    const url = this.baseUri + '/todos/' + id;

    if (this.todos.length > 0) {
      return Promise.resolve(this.todos.find((t) => t.id == id));
    }

    return this.http.get<Todo>(url).toPromise();
  }

  public post(todo: Todo): Promise<Todo> {
    const url = this.baseUri + '/todos';

    return this.http.post<Todo>(url, todo).toPromise();
  }

  public edit(todo: Todo): Promise<Todo> {
    const url = this.baseUri + '/todos/' + todo.id;

    return this.http.put<Todo>(url, todo).toPromise();
  }

}

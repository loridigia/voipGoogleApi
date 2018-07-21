import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../app.types';

@Component({
  selector: 'app-todos-list',
  template: `
    <div><a routerLink="/todos/add">Add new</a></div>
    <ul>
      <li [ngClass]="{'first': first, 'last': last, 'odd': odd, 'even': even }"
          id="todo-{{ todo.id }}"
          *ngFor="let todo of todos; let first = first; let odd = odd; let last = last; let even = even">
        <a title="Edit" [routerLink]="['/todos/edit', todo.id]">
          {{ todo.title | uppercase }} ( {{ todo.completed ? 'Y' : 'N'}} )
        </a>
      </li>
    </ul>

  `
})
export class ListComponent implements OnInit {

  public todos: Todo[] = [];

  public constructor(private todoService: TodoService) {
  }

  public ngOnInit(): void {

    this.todoService.list().then((todos) => this.todos = todos)
      .catch(ex => console.log(ex));

  }

}

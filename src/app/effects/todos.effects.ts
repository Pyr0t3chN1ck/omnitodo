import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as todoActions from '../actions/todo-actions';
import { TodoEntity } from '../reducers/todos.reducer';

@Injectable()
export class TodoEffects {
  apiUrl = environment.apiUrl;

  // turn a todoAdded => todoAddedSuccess | todoAddedFail
  saveTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoAdded),
      map(action => action.payload),
      switchMap(todo => this.client.post<TodoEntity>(this.apiUrl + 'todos', makeATodoCreate(todo))
        .pipe(
          map(response => todoActions.todoAddedSuccessfully({ oldId: todo.id, payload: response })),
          catchError(err => of(todoActions.todoAddedFailure({ message: 'Blammo!', payload: todo })))
        )
      )
    )
  );

  // turn a loadData => loadDataSucceeded | LoadDataFailed
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.loadTodos),
      switchMap(() => this.client.get<{ data: TodoEntity[] }>(this.apiUrl + 'todos')
        .pipe(
          map(results => todoActions.loadDataSucceeded({ payload: results.data })),
          catchError(results => of(todoActions.loadDataFailure({ message: 'Sorry. No Todos for you!' })))
        )
      )
    ), { dispatch: true }
  );

  completeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoCompleted),
      map(action => action.payload),
      switchMap(todo => this.client.post<TodoEntity>(this.apiUrl + 'todos/completed', makeATodoUpdate(todo))
        .pipe(
          map(response => todoActions.todoCompletedUpdateSuccess()),
          catchError(err => of(todoActions.todoCompletedUpdateFailure({ message: 'Blammo!', payload: todo })))
        )
      )
    )
  );

  incompleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoIncompleted),
      map(action => action.payload),
      switchMap(todo => this.client.post<TodoEntity>(this.apiUrl + 'todos/incomplete', makeATodoUpdate(todo))
        .pipe(
          map(response => todoActions.todoIncompletedUpdateSuccess()),
          catchError(err => of(todoActions.todoIncompletedUpdateFailure({ message: 'Blammo!', payload: todo })))
        )
      )
    )
  );

  todoProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoProjectUpdated),
      map(action => action.payload),
      switchMap(request => this.client.put<{ value: string }>(this.apiUrl + 'todos/' + request.id + '/project', { value: request.value })
        .pipe(
          map(response => todoActions.todoProjectUpdateSuccess()),
          catchError(err => of(todoActions.todoProjectUpdateFailure({ message: 'Blammo!', payload: request })))
        )
      )
    )
  );

  todoDueDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.todoDueDateUpdated),
      map(action => action.payload),
      switchMap(request => this.client.put<{ value: string }>(this.apiUrl + 'todos/' + request.id + '/duedate', { value: request.value })
        .pipe(
          map(response => todoActions.todoDueDateUpdateSuccess()),
          catchError(err => of(todoActions.todoDueDateUpdateFailure({ message: 'Blammo!', payload: request })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private client: HttpClient
  ) { }
}

interface TodoCreate {
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

interface TodoUpdate {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

function makeATodoCreate(todo: TodoEntity): TodoCreate {
  return {
    name: todo.name,
    project: todo.project,
    dueDate: todo.dueDate,
    completed: todo.completed
  };
}

function makeATodoUpdate(todo: TodoEntity): TodoUpdate {
  return {
    id: todo.id,
    name: todo.name,
    project: todo.project,
    dueDate: todo.dueDate,
    completed: todo.completed
  };
}

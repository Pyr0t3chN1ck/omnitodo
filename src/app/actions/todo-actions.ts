import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/todos.reducer';

let currentId = 1;

export const todoCompleted = createAction(
  '[todos] todo completed',
  props<{ payload: TodoEntity }>()
);

// Success
export const todoCompletedUpdateSuccess = createAction(
  '[todos] todo completed updated successfully'
);

// Failure
export const todoCompletedUpdateFailure = createAction(
  '[todos] todo completed updated failure',
  props<{ message: string, payload: TodoEntity }>()
);

export const todoIncompleted = createAction(
  '[todos] todo incompleted',
  props<{ payload: TodoEntity }>()
);

// Success
export const todoIncompletedUpdateSuccess = createAction(
  '[todos] todo incompleted updated successfully'
);

// Failure
export const todoIncompletedUpdateFailure = createAction(
  '[todos] todo incompleted updated failure',
  props<{ message: string, payload: TodoEntity }>()
);


// Command
export const todoAdded = createAction(
  '[todos] todo added',
  ({ name, dueDate, project }: TodoCreate) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      dueDate,
      project,
      completed: false
    } as TodoEntity
  })
);

// Success
export const todoAddedSuccessfully = createAction(
  '[todos] todo added successfully',
  props<{ oldId: string, payload: TodoEntity }>()
);

// Failure
export const todoAddedFailure = createAction(
  '[todos] todo added failure',
  props<{ message: string, payload: TodoEntity }>()
);

// Command

export const loadTodos = createAction(
  '[todos] load todo data'
);

// Success
export const loadDataSucceeded = createAction(
  '[todos] loaded data sucessfully',
  props<{ payload: TodoEntity[] }>()
);

// Failure
export const loadDataFailure = createAction(
  '[todos] loading data failed',
  props<{ message: string }>()
);

interface TodoCreate {
  name: string;
  dueDate?: string;
  project?: string;
}

import { createAction, props } from '@ngrx/store';
import { TodoEntity } from '../reducers/todos.reducer';

let currentId = 1;

// Command
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

// Command
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
export const todoProjectUpdated = createAction(
  '[todos] todo project updated',
  props<{ payload: { id: string, value: string, oldValue: string } }>()
);

// Success
export const todoProjectUpdateSuccess = createAction(
  '[todos] todo project updated successfully'
);

// Failure
export const todoProjectUpdateFailure = createAction(
  '[todos] todo project updated failure',
  props<{ message: string, payload: { id: string, value: string, oldValue: string } }>()
);

// Command
export const todoDueDateUpdated = createAction(
  '[todos] todo due date updated',
  ({ id, value, oldValue }) => ({
    payload: {
      id,
      oldValue,
      value: formatDueDate(value)
    }
  })
);

// Success
export const todoDueDateUpdateSuccess = createAction(
  '[todos] todo due date updated successfully'
);

// Failure
export const todoDueDateUpdateFailure = createAction(
  '[todos] todo due date updated failure',
  props<{ message: string, payload: { id: string, value: string, oldValue: string } }>()
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

function formatDueDate(dateString: string): string {
  const dueDate = new Date(dateString);
  return dueDate.getFullYear() + '-' + (dueDate.getMonth() + 1) + '-' + dueDate.getDate();
}

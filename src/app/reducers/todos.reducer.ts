import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-actions';

export interface TodoEntity {
  id: string;
  name: string;
  project?: string;
  dueDate?: string;
  completed: boolean;
}

export interface TodoState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

const initialState = adapter.getInitialState();

const reducerFunction = createReducer(
  initialState,
  on(actions.todoAddedFailure, (oldState, action) => adapter.removeOne(action.payload.id, oldState)),
  on(actions.todoAddedSuccessfully, (oldState, action) => {
    const tempState = adapter.removeOne(action.oldId, oldState);
    return adapter.addOne(action.payload, tempState);
  }),
  on(actions.loadDataSucceeded, (oldState, action) => adapter.setAll(action.payload, oldState)),
  on(actions.todoAdded, (oldState, action) => adapter.addOne(action.payload, oldState)),
  on(actions.todoCompleted, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      completed: true
    }
  }, oldState)),
  on(actions.todoCompletedUpdateFailure, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      completed: false
    }
  }, oldState)),
  on(actions.todoIncompleted, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      completed: false
    }
  }, oldState)),
  on(actions.todoIncompletedUpdateFailure, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      completed: true
    }
  }, oldState)),
  on(actions.todoProjectUpdated, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      project: action.payload.value
    }
  }, oldState)),
  on(actions.todoProjectUpdateFailure, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      project: action.payload.oldValue
    }
  }, oldState)),
  on(actions.todoDueDateUpdated, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      dueDate: action.payload.value
    }
  }, oldState)),
  on(actions.todoDueDateUpdateFailure, (oldState, action) => adapter.updateOne({
    id: action.payload.id,
    changes: {
      dueDate: action.payload.oldValue
    }
  }, oldState))
);

export function reducer(state: TodoState = initialState, action: Action) {
  return reducerFunction(state, action);
}




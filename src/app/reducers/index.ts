import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ProjectListModel, TodoListModel } from '../models';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';

export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodoState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer,
};

// Selectors are function that know how to efficiently
// get data needed for component

// Selector per "branch" of the state
const selectProjectsBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;

// Any "helper" selectors
const { selectAll: selectAllProjectEntities, selectEntities: selectProjectItems } = fromProjects.adapter.getSelectors(selectProjectsBranch);
const { selectAll: selectAllTodoEntities } = fromTodos.adapter.getSelectors(selectTodosBranch);

const selectAllIncompleteTodoEntities = createSelector(
  selectAllTodoEntities,
  todos => todos.filter(t => t.completed === false)
);

const selectTodoListItemsUnfiltered = createSelector(
  selectAllIncompleteTodoEntities,
  selectProjectItems,
  (todos, projects) => {
    return todos.map(todo => {
      return {
        ...todo,
        project: !todo.project ? null : projects[todo.project].name,
      } as TodoListModel;
    });
  }
);

// Any selectors your components need.

export const selectInboxTodoList = createSelector(
  selectTodoListItemsUnfiltered,
  (todos) => todos.filter(t => !t.dueDate && !t.project)
);

// TODO: We need a selector for the TodoEntry component
// that gives us a ProejctListModel[]

export const selectProjectListModel = createSelector(
  selectAllProjectEntities,
  items => items as ProjectListModel[]
);

export const selectInboxCount = createSelector(
  selectAllIncompleteTodoEntities,
  (todos) => todos.filter(t => !t.dueDate && !t.project).length
);

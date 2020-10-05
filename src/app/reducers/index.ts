import { ActionReducerMap, createSelector } from '@ngrx/store';
import { ProjectListModel } from '../models';
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

// Any "helper" selectors
const { selectAll: selectAllProjectEntities } = fromProjects.adapter.getSelectors(selectProjectsBranch);

// Any selectors your components need.

// TODO: We need a selector for the TodoEntry component
// that gives us a ProejctListModel[]

export const selectProjectListModel = createSelector(
  selectAllProjectEntities,
  items => items as ProjectListModel[]
);

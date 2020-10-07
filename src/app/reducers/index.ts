import { ActionReducerMap, createSelector } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { ProjectListModel, TodoListModel, ProjectListItemModel, PerspectiveModel } from '../models';
import * as fromProjects from './projects.reducer';
import * as fromTodos from './todos.reducer';
import * as formAuth from './auth.reducer';

export interface AppState {
  projects: fromProjects.ProjectState;
  todos: fromTodos.TodoState;
  auth: formAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  projects: fromProjects.reducer,
  todos: fromTodos.reducer,
  auth: formAuth.reducer,
};

// Selectors are function that know how to efficiently
// get data needed for component

// Selector per "branch" of the state
const selectProjectsBranch = (state: AppState) => state.projects;
const selectTodosBranch = (state: AppState) => state.todos;
const selectAuthBranch = (state: AppState) => state.auth;

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

export const selectProjectTodoList = createSelector(
  selectTodoListItemsUnfiltered,
  selectProjectItems,
  (todos, projects, props) => {
    const pName = projects[props.id].name;
    return {
      perspectiveName: pName + ' Project',
      items: todos.filter(todo => todo.project === pName)
    } as PerspectiveModel;
  }
);

export const selectInboxTodoList = createSelector(
  selectTodoListItemsUnfiltered,
  (todos) => {
    return {
      perspectiveName: 'Your Inbox',
      items: todos.filter(t => !t.dueDate && !t.project)
    } as PerspectiveModel;
  }
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

export const selectProjectListWithCount = createSelector(
  selectAllIncompleteTodoEntities,
  selectAllProjectEntities,
  (todos, projects) => {
    return projects.map(project => {
      const numberofItemsWithThatProject = todos.filter(todo => todo.project === project.id).length;
      return {
        ...project,
        numberOfProjects: numberofItemsWithThatProject
      } as ProjectListItemModel;
    });
  }
);

export const selectAuthIsLoggedIn = createSelector(
  selectAuthBranch,
  b => b.isLoggedIn
);

export const selectAuthUsername = createSelector(
  selectAuthBranch,
  b => b.username
);

export const selectAuthToken = createSelector(
  selectAuthBranch,
  b => b.token
);

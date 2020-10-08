import { createAction, props } from '@ngrx/store';
import { ProjectEntity } from '../reducers/projects.reducer';

let currentId = 1;

// Command
export const projectAdded = createAction(
  '[todos] project added',
  ({ project }) => ({

    payload: {
      id: 'P' + currentId++,
      name: formatProjectName(project)
    } as ProjectEntity
  })
);

// Success
export const projectAddedSuccessfully = createAction(
  '[todos] project added successfully',
  props<{ oldId: string, payload: ProjectEntity }>()
);

// Failure
export const projectAddedFailure = createAction(
  '[todos] project added failure',
  props<{ message: string, payload: ProjectEntity }>()
);

function formatProjectName(name: string): string {
  return name.trim().replace(/ /g, '-');
}

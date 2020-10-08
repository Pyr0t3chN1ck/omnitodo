import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as projectActions from '../actions/project.actions';
import { ProjectEntity } from '../reducers/projects.reducer';

@Injectable()
export class ProjectEffects {
  apiUrl = environment.apiUrl;

  constructor(private actions$: Actions, private client: HttpClient) { }

  // turn projectAdded => projectAddedSucces | projectAddedFail
  saveProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(projectActions.projectAdded),
      map(action => action.payload),
      switchMap(project => this.client.post<ProjectEntity>(this.apiUrl + 'projects', makeAProjectCreate(project))
        .pipe(
          map(response => projectActions.projectAddedSuccessfully({ oldId: project.id, payload: response })),
          catchError(err => of(projectActions.projectAddedFailure({ message: 'Blammo!', payload: project })))
        )
      )
    )
  );
}

interface ProjectCreate {
  name: string;
}

function makeAProjectCreate(project: ProjectEntity): ProjectCreate {
  return {
    name: project.name
  };
}

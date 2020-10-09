import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { find, map } from 'rxjs/operators';
import { projectAdded, projectAddedFailure } from 'src/app/actions/project.actions';
import { ProjectListModel } from 'src/app/models';
import { AppState, selectProjectListModel } from 'src/app/reducers';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent implements OnInit, OnDestroy {

  subscriptions: Subscription;
  projects: ProjectListModel[];
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      project: ['', [Validators.required]]
    });

    this.subscriptions = this.store.pipe(select(selectProjectListModel)).subscribe(p => this.projects = p);
  }

  get project(): AbstractControl { return this.form.get('project'); }

  checkDuplicateProjects(projectName: string): void {
    const duplicateIndex = this.projects.findIndex((p) => p.name.toLocaleLowerCase() === projectName.toLowerCase());
    const errors = this.form.controls.project.errors;
    if (duplicateIndex !== -1) {
      this.form.controls.project.setErrors({ ...errors, duplicate: true });
    } else {
      this.form.controls.project.setErrors({ ...errors, duplicate: false });
    }
  }

  submit(): void {
    // validate data
    this.store.dispatch(projectAdded({ ...this.form.value }));
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

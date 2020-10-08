import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { projectAdded, projectAddedFailure } from 'src/app/actions/project.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-project-entry',
  templateUrl: './project-entry.component.html',
  styleUrls: ['./project-entry.component.scss']
})
export class ProjectEntryComponent implements OnInit {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      project: ['', [Validators.required]]
    });
  }

  get project(): AbstractControl { return this.form.get('project'); }

  submit(): void {
    // validate data
    this.store.dispatch(projectAdded({ ...this.form.value }));
    this.form.reset();
  }
}

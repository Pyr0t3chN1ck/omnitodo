import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { todoCompleted, todoIncompleted, todoProjectUpdated } from 'src/app/actions/todo-actions';
import { PerspectiveModel, ProjectListModel, TodoListModel } from 'src/app/models';
import { AppState, selectInboxTodoList, selectProjectListModel, selectProjectTodoList } from 'src/app/reducers';
import { TodoEntity } from 'src/app/reducers/todos.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  perspective$: Observable<PerspectiveModel>;
  projects$: Observable<ProjectListModel[]>;
  form: FormGroup;
  enableEdit = false;
  editRow = -1;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: { perspective: string, id?: string }
  ) { }

  ngOnInit(): void {
    switch (this.data.perspective) {
      case 'Inbox': {
        this.perspective$ = this.store.pipe(
          select(selectInboxTodoList)
        );
        break;
      }
      case 'Project': {
        this.perspective$ = this.store.pipe(
          select(selectProjectTodoList, { id: this.data.id }),
        );
        break;
      }
    }
    this.projects$ = this.store.pipe(
      select(selectProjectListModel)
    );
    this.form = this.formBuilder.group({
      project: [this.data.id]
    });
  }

  enableProjectEdit(index: number): void {
    this.enableEdit = true;
    this.editRow = index;
  }

  editTodoProject(todo: TodoListModel): void {

    const payload = { id: todo.id, value: this.form.controls.project.value, oldValue: this.data.id };
    this.store.dispatch(todoProjectUpdated({ payload }));
  }

  cancel(): void {
    this.enableEdit = false;
    this.editRow = -1;
    this.form.controls.project.patchValue(this.data.id);
  }

  markComplete(payload: TodoEntity): void {
    this.store.dispatch(todoCompleted({ payload }));
  }

  markIncomplete(payload: TodoEntity): void {
    this.store.dispatch(todoIncompleted({ payload }));
  }

}

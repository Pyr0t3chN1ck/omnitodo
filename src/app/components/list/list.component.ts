import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { todoCompleted, todoDueDateUpdated, todoIncompleted, todoProjectUpdated } from 'src/app/actions/todo-actions';
import { PerspectiveModel, ProjectListModel, TodoListModel } from 'src/app/models';
import { AppState, selectInboxTodoList, selectProjectListModel, selectProjectTodoList } from 'src/app/reducers';
import { TodoEntity } from 'src/app/reducers/todos.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  perspective$: Observable<PerspectiveModel>;
  projects$: Observable<ProjectListModel[]>;
  form: FormGroup;
  enableProjectEdit = false;
  enableDueDateEdit = false;
  editProjectRow = -1;
  editDueDateRow = -1;

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
      project: [this.data.id],
      dueDate: ['']
    });
  }

  enableProjectEditing(index: number): void {
    this.enableProjectEdit = true;
    this.editProjectRow = index;
  }

  editTodoProject(todo: TodoListModel): void {
    const payload = { id: todo.id, value: this.form.controls.project.value, oldValue: this.data.id };
    this.store.dispatch(todoProjectUpdated({ payload }));
    this.enableProjectEdit = false;
    this.editProjectRow = -1;
    this.form.controls.project.patchValue(this.data.id);
  }

  cancelProjectEdit(): void {
    this.enableProjectEdit = false;
    this.editProjectRow = -1;
    this.form.controls.project.patchValue(this.data.id);
  }

  enableDueDateEditing(index: number): void {
    this.enableDueDateEdit = true;
    this.editDueDateRow = index;
  }

  editTodoDueDate(todo: TodoListModel): void {
    let editedTodo: TodoListModel;
    this.subscriptions = this.perspective$.subscribe(x => editedTodo = x.items.find(td => td.id === todo.id));
    const payload = { id: todo.id, value: this.form.controls.dueDate.value as string, oldValue: editedTodo.dueDate };
    this.store.dispatch(todoDueDateUpdated(payload));
    this.enableDueDateEdit = false;
    this.editDueDateRow = -1;
    this.form.controls.dueDate.patchValue('');
  }

  cancelDueDateEdit(): void {
    this.enableDueDateEdit = false;
    this.editDueDateRow = -1;
    this.form.controls.dueDate.patchValue('');
  }

  markComplete(payload: TodoEntity): void {
    this.store.dispatch(todoCompleted({ payload }));
  }

  markIncomplete(payload: TodoEntity): void {
    this.store.dispatch(todoIncompleted({ payload }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

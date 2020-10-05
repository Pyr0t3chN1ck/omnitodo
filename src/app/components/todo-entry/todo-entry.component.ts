import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-todo-entry',
  templateUrl: './todo-entry.component.html',
  styleUrls: ['./todo-entry.component.scss']
})
export class TodoEntryComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<TodoEntryComponent>) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.bottomSheetRef.dismiss();
  }

  submit(): void {
    // validate data
    // dispatch action to store, etc.
    this.bottomSheetRef.dismiss();
  }
}

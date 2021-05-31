import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { Input } from '@angular/core';

import { TodoService } from "../shared/todo.service";
import { ToDo } from '../shared/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ToDo } from "../../shared/todo.model";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  providers: [TodoService]
})

export class TodoFormComponent implements OnInit {
  panelOpenState = false;
  submitted = false;
  // fetchedData: any;
  data: any;
  form: FormGroup;
  editForm: FormGroup;
  selectedData: {
      _id: "",
      title: "",
      desc: "",
      whenToDo: "",
      done: boolean
  };
  variableToUpdate = 0;
  constructor(public toDoService: TodoService, public formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }
  fetchedData: any;

  closePanel(val: boolean) {
    this.panelOpenState = val;
  }

  // closePanel(){
  //   this.panelOpenState = true;
  //   console.log(this.panelOpenState)
  // }

  createForm(){
    this.form = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      whenToDo: ['', Validators.required],
      done: [false]
    })
  }

  ngOnInit(): void {
    this.createForm();
    this.getAll();
  }

  getAll() {
    this.toDoService.getData().subscribe((results) =>  {
      this.fetchedData = results;
      console.log(this.fetchedData);
    })
  }

  onCancel(){
    this.form.reset();
    this.toDoService.selectedToDo = undefined;
    this._snackBar.open('Editing canceled...', 'Ok', {
      duration: 3000
    });
  }

  onEdit(){
    this.submitted = true;
    
    if(this.form.invalid){
      this._snackBar.open('Wrong data...', 'Ok', {
        duration: 3000
      });
      return;
    }
    this.closePanel(false);

    this.toDoService.putData(this.form.value).subscribe(res => {
      this.data = res;
      this.getAll();
    })
    this.toDoService.selectedToDo = undefined;
    console.log(this.toDoService.selectedToDo);
    this.form.reset();
    this._snackBar.open('ToDo edited...', 'Ok', {
      duration: 3000
    });

  }

  onSubmit() {
    this.submitted = true;
    
    if(this.form.invalid){
      this._snackBar.open('Wrong data...', 'Ok', {
        duration: 3000
      });
      return;
    }
    this.closePanel(false);

    this.toDoService.postData(this.form.value).subscribe(res => {
      this.data = res;
      this.getAll();
    })
    this.form.reset();
    this._snackBar.open('ToDo added...', 'Ok', {
      duration: 3000
    });
  }
}

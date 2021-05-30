import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"
import { Input } from '@angular/core';

import { TodoService } from "../shared/todo.service";
import { ToDo } from '../shared/todo.model';
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
  selectedData: {
      _id: "",
      title: "",
      desc: "",
      whenToDo: "",
      done: boolean
  };
  constructor(public toDoService: TodoService, public formBuilder: FormBuilder) { }
  fetchedData: any;
  createForm(){
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      whenToDo: ['', Validators.required],
      done: [false]
    })
  }

  ngOnInit(): void {
    this.createForm();
    // this.resetForm();
    this.getAll();
  }

  getAll() {
    this.toDoService.getData().subscribe((results) =>  {
      this.fetchedData = results;
      console.log(this.fetchedData);
    })
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid){
      console.log(this.form.value)
      return;
    }
    console.log(this.form.value);

    this.toDoService.postData(this.form.value).subscribe(res => {
      this.data = res;
      this.getAll();
    })
    this.form.reset();
  }
}

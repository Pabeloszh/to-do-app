import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  fetchedData: any;

  constructor(private toDoService: TodoService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.toDoService.getData().subscribe((results) =>  {
      this.fetchedData = results;
      console.log(this.fetchedData);
    })
  }

}

import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() fetchedData: any;
  @Input() getAll: any;
  @Input() selectedData: any;
  @Input() form:any;
  data: any;


  constructor(public toDoService: TodoService) { }

  ngOnInit(): void {
  }

  onEdit(data: any){
    this.form.patchValue({
      id: data._id,
      title: data.title,
      desc: data.desc,
      whenToDo: data.whenToDo.substr(0, 10)
    })
    this.toDoService.selectedToDo = data;
    console.log(this.toDoService.selectedToDo)
    // this.toDoService.putData(data._id, this.form.value).subscribe(res => {
    //   this.data = res;
    //   this.getAll();
    // })
    // this.form.reset();

  }

  isDone(data: any){
    this.toDoService.putDone(data).subscribe((res) =>  {
      this.getAll();
    });
  }

  onDelete(id: string){
    this.toDoService.deleteData(id).subscribe((res) =>  {
      this.getAll();
    });
  }


}

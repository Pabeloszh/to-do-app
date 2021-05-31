import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() getAll: any;
  @Input() fetchedData: any;
  @Input() form:any;
  @Output() editedEmitter = new EventEmitter<boolean>();
  data: any;

  constructor(public toDoService: TodoService, private _snackBar: MatSnackBar) { }


  closePanel() {
    this.editedEmitter.emit(true);
  }

  ngOnInit(): void {
  }

  onEdit(data: any){
    this.closePanel();
    this.form.patchValue({
      _id: data._id,
      title: data.title,
      desc: data.desc,
      whenToDo: data.whenToDo.substr(0, 10)
    })
    this.toDoService.selectedToDo = data;
  }

  isDone(data: any){
    this.toDoService.putDone(data).subscribe((res) =>  {
      this.getAll();
    });
  }

  onDelete(id: string){
    this.toDoService.deleteData(id).subscribe((res) =>  {
      this.getAll();
      this.toDoService.selectedToDo = undefined;
      this._snackBar.open('ToDo deleted...', 'Ok', {
        duration: 3000
      });
    });
  }


}

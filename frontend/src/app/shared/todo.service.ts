import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { ToDo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  selectedToDo: ToDo;
  toDos: ToDo[];

  constructor(private httpClient: HttpClient) { }

  getData(){
    return this.httpClient.get('http://localhost:5000/todo')
  }
  postData(data: ToDo){
    return this.httpClient.post('http://localhost:5000/todo', data)
  }
  putDone(data: ToDo){
    return this.httpClient.put(`http://localhost:5000/todo/${data._id}`, data)
  }
  putData(data: ToDo){
    return this.httpClient.put(`http://localhost:5000/todo/${data._id}`, data)
  }
  deleteData(id: string){
    return this.httpClient.delete(`http://localhost:5000/todo/${id}`)
  }
}

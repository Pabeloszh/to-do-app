import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDoApp';

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(){
    this._snackBar.open(`The heck it's supposed to do? It's only ToDoApp...`, 'Yeah...right', {
      duration: 5000
    });
  }
}

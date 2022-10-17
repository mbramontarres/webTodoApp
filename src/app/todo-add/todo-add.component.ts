import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { User } from '../user';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {


  public error:boolean = false;
  public success: boolean = false;

  public addForm = new FormGroup({
    'id': new FormControl(null, [Validators.required, Validators.min(0)]),
    'title': new FormControl(null, [Validators.required, Validators.maxLength(200),]),
    'completed': new FormControl(null, [Validators.required])
  });
  
  constructor(private todoService: TodoService) { }

  get f() { return this.addForm.controls; }

  ngOnInit(): void {

  }


  public onSave(): void {
    if (this.addForm.invalid) {
      return;
    }
    const addItem: Todo = {
      id:0,
      title: this.addForm.value.title!,
      completed: ((this.addForm.value.completed! == "completed")? true : false),
      user: {id:this.addForm.value.id!,username:''} 
    };
    
    const req = this.todoService.save(addItem);
    req.subscribe(data => {console.log('success', data); this.success=true, this.error=false},
    error => this.error=true);
  }

}

import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { User } from '../user';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  public todos : Todo[] = [];
  public users: User[] = [];
  public selected: Number = 0;

  public page: number = 0;
  public total: number = 0;
  public totalListed: number = 0;
  public nextprevbutton: boolean= true;



  constructor(private todoService: TodoService) { }


  getNextPage(): void {
    console.log(this.total-1,this.totalListed, this.page)
    if(this.total>(this.page+1)*10){
      console.log("hola")
      this.page += 1;
      this.getTodos();
    }
    
    
  }

  getPreviousPage(): void {
    if(this.page > 0){
      this.page -=1;
      this.getTodos();
    }
    
  }


  getTodos(): void {
    this.todoService.getTodos(this.page).subscribe(data => {
      this.todos = data;
    });

  }
  reloadTodos(): void {
    this.page = 0;
    this.nextprevbutton = true;
    this.getTodos();
  }


  getUsers(): void {
    this.todoService.getUsers().subscribe(data => {this.users = data; console.log(this.users)});
  }

  deleteTodo(id: number): void {
    if(confirm("Are you sure to delete todo?")){
      this.todoService.deleteTodo(id).subscribe(() => this.getTodos());
    }
  }

  OnIdSelected(selected:any):void{
    this.page = 0;
    this.todoService.getUserTodos(selected).subscribe(data => this.todos = data);
    this.nextprevbutton = false;
    console.log(this.todos);
  }

  ngOnInit(): void {
    this.getTodos();
    this.getUsers();
    this.todoService.count().subscribe(data => {this.total=data;  console.log(data)});
    
  }

}

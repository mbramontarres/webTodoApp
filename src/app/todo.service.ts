import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoUrl: string;

  constructor(private http: HttpClient) { 
    this.todoUrl = "http://localhost:8080/api"
  }
   public httpOptions = {
    headers: new HttpHeaders({
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Credentials': 'true'
    })
  };

  public count(): Observable<number> {
   
    return this.http.get<number>(this.todoUrl + '/todos/count');
  }

 
  public getTodos(page: Number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl + '/todos?' + "pageNumber=" + page);
  }

  public getUserTodos(selectedId:number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl + '/todos/user/' + selectedId);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.todoUrl + '/users');
  }

  public deleteTodo(todoId: number): Observable<Todo> {
    return this.http.delete<Todo>(this.todoUrl + '/todos/' + todoId);
  }

  public save(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.todoUrl + '/todos',todo);

  }
}

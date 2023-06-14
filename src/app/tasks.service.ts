import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private getAuthorizationHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getAllTasks(): Observable<Task[]> {
    const headers = this.getAuthorizationHeaders();
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`, { headers });
  }

  createTask(task: Task): Observable<Task> {
    const headers = this.getAuthorizationHeaders();
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task, { headers });
  }

  updateTask(id: number, task: Task): Observable<void> {
    const headers = this.getAuthorizationHeaders();
    return this.http.put<void>(`${this.baseUrl}/tasks/${id}`, task, { headers });
  }

  deleteTask(id: number): Observable<void> {
    const headers = this.getAuthorizationHeaders();
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`, { headers });
  }
}

import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TasksService } from './tasks.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  username: string = '';
  password: string = '';

  constructor(
    private tasksService: TasksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe((response) => {
      if (response.access_token) {
        console.log('hola')
      } else {
        // Muestra un mensaje de error al usuario si el inicio de sesión falla
      }
    });
  }
}

import { Component } from '@angular/core';
import {Task} from "../home/task";
import {Router} from "@angular/router";
import {TasksService} from "../home/tasks.service";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tasks: Task[] = [];
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
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
      console.log(response);
      if (response.access_token) {
        this.router.navigate(['/home']);
      } else {
        // Muestra un mensaje de error al usuario si el inicio de sesión falla
      }
    });
  }
}

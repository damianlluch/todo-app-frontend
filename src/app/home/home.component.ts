import { Component, OnInit } from '@angular/core';
import {TasksService} from "../tasks.service";
import { Task } from '../task'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  editingTaskId: number | null = null;
  editingTask: Task | null = null;
  newTask: Task = { title: '', completed: false };

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  createTask(): void {
    this.tasksService.createTask(this.newTask).subscribe((task) => {
      this.tasks.push(task);
      this.newTask = {
        title: '',
        completed: false
      };
    });
  }

  editTask(task: Task): void {
    this.editingTaskId = task.id ?? null;
    this.editingTask = { ...task };
  }

  updateTask(): void {
    if (this.editingTask && this.editingTaskId) {
      const updatedTask: Task = {
        id: this.editingTask.id ?? null,
        title: this.editingTask.title ?? '',
        completed: this.editingTask.completed ?? false
      };

      this.tasksService
        .updateTask(this.editingTaskId, updatedTask)
        .subscribe(() => {
          const index = this.tasks.findIndex(
            (task) => task.id === this.editingTaskId
          );
          if (index !== -1) {
            this.tasks[index] = { ...updatedTask };
            this.cancelEdit();
          }
        });
    }
  }



  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editingTask = null;
  }
}

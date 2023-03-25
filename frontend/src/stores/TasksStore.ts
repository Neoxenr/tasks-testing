// MobX
import { observable, action, makeObservable } from 'mobx';

// Entities
import { Task } from 'types/entity/task';

// Dtos
import { TaskCreateDto, TaskEditDto } from 'types/dto/task';

class TasksStore {
  @observable
  tasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

  constructor() {
    makeObservable(this);
  }

  @action
  addTask = (dto: TaskCreateDto): void => {
    this.tasks = [...this.tasks, { id: crypto.randomUUID(), ...dto }];

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  @action
  editTask = (id: string | undefined, dto: TaskEditDto): void => {
    const index = this.tasks.findIndex((item: Task) => item.id === id);

    this.tasks[index] = { ...this.tasks[index], ...dto };

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  @action
  removeTask = (id: string): void => {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  @action
  getTask = (id: string | undefined): Task => {
    const task = this.tasks.find((item: Task) => item.id === id);

    if (!task) {
      throw new TypeError('The task not found');
    }

    return task;
  };
}

const tasksStore = new TasksStore();

export default tasksStore;

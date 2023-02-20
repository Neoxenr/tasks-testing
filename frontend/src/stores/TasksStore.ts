// MobX
import { action, makeObservable, observable } from 'mobx';

// Entities
import { Task } from 'types/entity/task';

// Dtos
import { TaskCreateDto } from 'types/dto/task';

class TasksStore {
  @observable
  tasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

  constructor() {
    makeObservable(this);
  }

  @action
  addTask = (task: TaskCreateDto): void => {
    this.tasks = [...this.tasks, { id: crypto.randomUUID(), ...task }];

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  @action
  removeTask = (id: string): void => {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };

  @action
  getTask = (id: string | undefined): Task | undefined => {
    return this.tasks.find((item: Task) => item.id === id);
  };
}

const tasksStore = new TasksStore();

export default tasksStore;

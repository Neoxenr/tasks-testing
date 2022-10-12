import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(taskId: string): Promise<Task> {
    return this.taskRepository.findOneByOrFail({ id: taskId });
  }

  async update(taskId: string, updateTaskDto: UpdateTaskDto): Promise<boolean> {
    const updateResponse: UpdateResult = await this.taskRepository.update(
      taskId,
      updateTaskDto,
    );

    if (!updateResponse.affected) {
      throw new NotFoundException(taskId);
    }

    return true;
  }

  async remove(taskId: string): Promise<boolean> {
    const deleteResponse: DeleteResult = await this.taskRepository.delete(
      taskId,
    );

    if (!deleteResponse.affected) {
      throw new NotFoundException(taskId);
    }

    return true;
  }
}

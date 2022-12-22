import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }
  // пусть возвр не все поля
  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) taskId: string): Promise<Task> {
    return this.taskService.findOne(taskId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<boolean> {
    return this.taskService.update(taskId, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) taskId: string): Promise<boolean> {
    return this.taskService.remove(taskId);
  }
}

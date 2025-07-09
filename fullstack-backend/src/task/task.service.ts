import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto/filter-task.dto';
import { Like } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(dto);
    return this.taskRepository.save(task);
  }

  async getTasks(filter: FilterTaskDto): Promise<{ data: Task[]; total: number }> {
    const { status, search, page = 1, limit = 10 } = filter;
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.title = Like(`%${search}%`);
    }
    const [data, total] = await this.taskRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'ASC' },
    });
    return { data, total };
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async attachFile(id: number, filename: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.file = filename;
    return this.taskRepository.save(task);
  }
}

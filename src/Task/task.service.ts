import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, ILike, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateTaskRequestDto, CreateTaskResponceDto, DeleteTaskResponceDto, GetTaskResponceDto, UpdateTaskResponceDto } from 'src/shared/dto';
import { TaskStatus, TaskStatusReq } from 'src/shared/enums';
import { DynamicException } from 'src/shared/services/exception.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) { }

  async createTask(taskData: CreateTaskRequestDto): Promise<CreateTaskResponceDto> {
    this.logger.log(`Received Request from creating task`)
    const taskInstance = this.taskRepository.create(taskData);
    const task = await this.taskRepository.save(taskInstance);
    return {
      data: task,
      message: 'Task Created SuccessFully'
    }
  }

  async getTasks(page: number, limit: number, status: TaskStatusReq, text: string, from: string, to: string, priority: string): Promise<any> {
    this.logger.log(`Received Request to get all tasks`);
    const filter: FindOptionsWhere<Task> = {};

    if (status) {
      if (status === TaskStatusReq.DONE) {
        filter.status = <TaskStatus><unknown>status
      } else if (status === TaskStatusReq.ALL) {
        filter.status = In([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.PAUSED, TaskStatus.PENDING])
      } else if (status === TaskStatusReq.ACTIVE) {
        filter.status = In([TaskStatus.IN_PROGRESS, TaskStatus.PENDING])
      }
    }

    if (text && text.length) {
      filter.name = ILike(`%${text}%`)
    }

    if (from && to) {
      filter.dueDate = Between(new Date(from), new Date(to));
    } else if (from) {
      filter.dueDate = MoreThanOrEqual(new Date(from));
    } else if (to) {
      filter.dueDate = LessThanOrEqual(new Date(to));
    }

    if (priority) {
      const priorityList = priority.split(',').map((p) => p.trim());
      filter.priority = In(priorityList);
    }

    const [data, count] = await this.taskRepository.findAndCount({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: data,
      count,
      page: Number(page),
      message: 'Task Retrieved SuccessFully'
    }
  }

  async getTaskById(id: number): Promise<GetTaskResponceDto> {
    this.logger.log(`Received Request to get task by id: ${id}`);
    const task = await this.taskRepository.findOne({ where: { id } });

    return {
      data: task,
      message: 'Task Retrieved SuccessFully'
    }
  }

  async deleteTask(id: number): Promise<DeleteTaskResponceDto> {
    this.logger.log(`Received Request to Delete task where id: ${id}`);
    await this.taskRepository.delete(id);

    return {
      data: null,
      message: 'Task Deleted SuccessFully'
    }
  }

  async updateTask(id: number, updateData: Partial<Task>): Promise<UpdateTaskResponceDto> {
    this.logger.log(`Received Request to Update task where id: ${id}`);
    const find = await this.taskRepository.find({ where: { id } })
    if (find.length === 0) {
      throw new DynamicException(`Task not found`, HttpStatus.NOT_FOUND);
    }
    const task = await this.taskRepository.save({ ...find[0], ...updateData });

    return {
      data: task,
      message: 'Task Updated SuccessFully'
    }
  }
}

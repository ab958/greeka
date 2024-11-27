import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateTaskRequestDto, CreateTaskResponceDto, DeleteTaskResponceDto, GetTaskResponceDto, UpdateTaskRequestDto, UpdateTaskResponceDto } from 'src/shared/dto';
import { TaskPriority, TaskStatus, TaskStatusReq } from 'src/shared/enums';

@Controller('task')
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }
  
  @Post()
  async createTask(@Body() taskData: CreateTaskRequestDto): Promise<CreateTaskResponceDto> {
    return await this.taskService.createTask(taskData);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() updateData: UpdateTaskRequestDto): Promise<UpdateTaskResponceDto> {
    return await this.taskService.updateTask(id, updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<DeleteTaskResponceDto> {
    return await this.taskService.deleteTask(id);
  }

  @Get()
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatusReq,
  })
  @ApiQuery({
    name: 'text',
    required: false,
  })
  @ApiQuery({
    name: 'from',
    required: false,
  })
  @ApiQuery({
    name: 'to',
    required: false,
  })

  @ApiQuery({
    name: 'priority',
    type: String,
    required: false
  })

  async getTasks(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status: TaskStatusReq,
    @Query('text') text: string,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('priority') priority?: string
  ) {
    return await this.taskService.getTasks(
      page,
      limit,
      status,
      text,
      from,
      to,
      priority
    );
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<GetTaskResponceDto> {
    return await this.taskService.getTaskById(id);
  }

}

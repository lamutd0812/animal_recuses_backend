import { Authorization, Roles } from './../../common/decorators/auth.decorator';
import { User } from './../users/user.entity';
import {
  Body,
  ParseIntPipe,
  Get,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  Controller,
  Param,
  Patch,
  Query,
  Logger,
} from '@nestjs/common';
import { ReqUser } from '../../common/decorators/req-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { ERole } from 'src/config/constants';
import { ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@Authorization()
@ApiTags('tasks')
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get()
  // @Roles(ERole.STAFF, ERole.MANAGER)
  @Roles(ERole.ADMIN)
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @ReqUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} is getting all tasks...`);
    return this.tasksService.getTasksWithFilter(filterDto, user.id_user);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @ReqUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<string> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status);
  }
}

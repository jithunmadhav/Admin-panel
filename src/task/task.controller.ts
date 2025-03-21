import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.model';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';

interface TaskResponse {
    statusCode: number;
    message: string;
    task?: Task;
    list?: Task[]
}
@Controller('task')
export class TaskController {
    constructor (private readonly taskService: TaskService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createTask(@Body() createTaskDto:CreateTaskDto): Promise<TaskResponse> {
        const task = await this.taskService.create(createTaskDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'Task created successfully',
            task
        }
    }

    @UseGuards(AuthGuard)
    @Get()
    async listTasks(@Request() req:{userId:number}): Promise<TaskResponse> {
        const list =  await this.taskService.listTasks(req.userId);
        return{
            statusCode: HttpStatus.OK,
            message: 'Tasks listed successfully',
            list
        }
    }

    @Patch(':id')
    async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<TaskResponse> {
        const task = await this.taskService.update(id, updateTaskDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'Task updated successfully',
            task
        }
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: number): Promise<TaskResponse> {
        const task = await this.taskService.delete(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Task deleted successfully',
        }
    }
}

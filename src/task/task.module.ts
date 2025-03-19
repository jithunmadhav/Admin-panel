import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.model';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports:[SequelizeModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}

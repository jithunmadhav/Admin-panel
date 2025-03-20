import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/entities/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModuleApp } from 'src/config/config.module';
import { Task } from 'src/task/entities/task.model';

@Module({
  imports:[
    ConfigModuleApp,
    SequelizeModule.forFeature([User,Task]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

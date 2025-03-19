import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserAuthModule } from './user/user.module';

import { ConfigModuleApp } from './config/config.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModuleApp ,
     DatabaseModule,
     UserAuthModule,
     TaskModule,
     AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

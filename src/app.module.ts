import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserAuthModule } from './user-auth/user-auth.module';

import { ConfigModuleApp } from './config/config.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModuleApp ,
     DatabaseModule,
     UserAuthModule,
     TaskModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

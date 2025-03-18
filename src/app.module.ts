import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserAuthModule } from './user-auth/user-auth.module';

import { ConfigModuleApp } from './config/config.module';

@Module({
  imports: [
    ConfigModuleApp ,
     DatabaseModule,
     UserAuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

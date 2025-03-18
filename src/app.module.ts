import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { DatabaseModule } from './database/database.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  imports: [AdminAuthModule, DatabaseModule, UserAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

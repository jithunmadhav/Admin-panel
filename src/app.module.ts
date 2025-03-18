import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@Module({
  imports: [AdminAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user-auth/entities/user.model';
import { ConfigModuleApp } from './config/config.module';

@Module({
  imports: [
    ConfigModuleApp ,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User],
    }),
     DatabaseModule,
     UserAuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

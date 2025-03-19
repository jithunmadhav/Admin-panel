import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModuleApp } from 'src/config/config.module';
import { User } from 'src/user/entities/user.model';
@Module({
    imports: [
        ConfigModuleApp, 
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST, 
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            autoLoadModels: true,
            models: [User],
        }),
    ],
})
export class DatabaseModule {}

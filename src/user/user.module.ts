import { Module } from '@nestjs/common';
import { UserAuthController } from './user.controller';
import { UserAuthService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.model';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class UserAuthModule {}

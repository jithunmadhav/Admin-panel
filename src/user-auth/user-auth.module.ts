import { Module } from '@nestjs/common';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.model';

@Module({
  imports:[SequelizeModule.forFeature([User])],
  controllers: [UserAuthController],
  providers: [UserAuthService],
})
export class UserAuthModule {}

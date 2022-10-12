import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './resources/task/task.module';
import { SolutionModule } from './resources/solution/solution.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_URL } from './config';
import { UserModule } from './resources/user/user.module';
import { RoleModule } from './resources/role/role.module';
import { Solution } from './resources/solution/entities/solution.entity';
import { Task } from './resources/task/entities/task.entity';
import { Role } from './resources/role/entities/role.entity';
import { User } from './resources/user/entities/user.entity';

@Module({
  imports: [
    TaskModule,
    SolutionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: DB_URL,
      entities: [Task, Solution, Role, User],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

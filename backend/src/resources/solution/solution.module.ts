import { Module } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { SolutionController } from './solution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solution } from './entities/solution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Solution])],
  controllers: [SolutionController],
  providers: [SolutionService],
  exports: [TypeOrmModule],
})
export class SolutionModule {}

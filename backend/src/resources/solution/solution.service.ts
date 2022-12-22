import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Solution } from './entities/solution.entity';

@Injectable()
export class SolutionService {
  constructor(
    @InjectRepository(Solution)
    private readonly solutionRepository: Repository<Solution>,
  ) {}

  async create(createSolutionDto: CreateSolutionDto): Promise<Solution> {
    return this.solutionRepository.save(createSolutionDto);
  }

  async findAll(): Promise<Solution[]> {
    return this.solutionRepository.find();
  }

  async findOne(solutionId: string): Promise<Solution> {
    return this.solutionRepository.findOneByOrFail({ id: solutionId });
  }

  async update(
    solutionId: string,
    updateSolutionDto: UpdateSolutionDto,
  ): Promise<boolean> {
    const updateResponse: UpdateResult = await this.solutionRepository.update(
      solutionId,
      updateSolutionDto,
    );

    if (!updateResponse.affected) {
      throw new NotFoundException(solutionId);
    }

    return true;
  }

  async remove(solutionId: string): Promise<boolean> {
    const deleteResponse: DeleteResult = await this.solutionRepository.delete(
      solutionId,
    );

    if (!deleteResponse.affected) {
      throw new NotFoundException(solutionId);
    }

    return true;
  }
}

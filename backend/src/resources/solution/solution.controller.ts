import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SolutionService } from './solution.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { Solution } from './entities/solution.entity';

@Controller('solution')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Post()
  async create(
    @Body() createSolutionDto: CreateSolutionDto,
  ): Promise<Solution> {
    return this.solutionService.create(createSolutionDto);
  }

  @Get()
  async findAll(): Promise<Solution[]> {
    return this.solutionService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) solutionId: string,
  ): Promise<Solution> {
    return this.solutionService.findOne(solutionId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) solutionId: string,
    @Body() updateSolutionDto: UpdateSolutionDto,
  ): Promise<boolean> {
    return this.solutionService.update(solutionId, updateSolutionDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) solutionId: string,
  ): Promise<boolean> {
    return this.solutionService.remove(solutionId);
  }
}

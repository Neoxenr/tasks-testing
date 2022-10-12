import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ id: userId });
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const updateResponse: UpdateResult = await this.userRepository.update(
      userId,
      updateUserDto,
    );

    if (!updateResponse.affected) {
      throw new NotFoundException(userId);
    }

    return true;
  }

  async remove(userId: string): Promise<boolean> {
    const deleteResponse: DeleteResult = await this.userRepository.delete(
      userId,
    );

    if (!deleteResponse.affected) {
      throw new NotFoundException(userId);
    }

    return true;
  }
}

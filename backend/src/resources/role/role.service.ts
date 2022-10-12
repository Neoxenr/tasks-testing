import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepository.save(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(roleId: string): Promise<Role> {
    return this.roleRepository.findOneByOrFail({ id: roleId });
  }

  async update(roleId: string, updateRoleDto: UpdateRoleDto): Promise<boolean> {
    const updateResponse: UpdateResult = await this.roleRepository.update(
      roleId,
      updateRoleDto,
    );

    if (!updateResponse.affected) {
      throw new NotFoundException(roleId);
    }

    return true;
  }

  async remove(roleId: string): Promise<boolean> {
    const deleteResponse: DeleteResult = await this.roleRepository.delete(
      roleId,
    );

    if (!deleteResponse.affected) {
      throw new NotFoundException(roleId);
    }

    return true;
  }
}

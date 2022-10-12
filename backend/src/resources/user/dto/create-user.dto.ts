import { IsUUID } from 'class-validator';

export class CreateUserDto {
  name: string;

  surname: string;

  @IsUUID()
  roleId: string;
}

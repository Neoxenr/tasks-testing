import { IsUUID } from 'class-validator';

export class UpdateUserDto {
  name: string;

  surname: string;

  @IsUUID()
  roleId: string;
}

import { Role } from 'src/resources/role/entities/role.entity';
import { Solution } from 'src/resources/solution/entities/solution.entity';
import { Task } from 'src/resources/task/entities/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  surname: string;

  @OneToMany(() => Solution, (solution) => solution.user, { nullable: true })
  solutions?: Solution[];

  @OneToMany(() => Task, (task) => task.user, { nullable: true })
  tasks?: Task[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column('varchar')
  roleId: string;
}

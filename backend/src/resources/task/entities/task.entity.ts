import { Solution } from 'src/resources/solution/entities/solution.entity';
import { User } from 'src/resources/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar')
  language: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  dockerImageName: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column('varchar')
  userId: string;

  @Column('varchar')
  mainCode: string;

  @Column('varchar')
  testCode: string;

  @OneToMany(() => Solution, (solution) => solution.taskId, { nullable: true })
  solutions: Solution[];
}

import { Task } from 'src/resources/task/entities/task.entity';
import { User } from 'src/resources/user/entities/user.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'solution' })
export class Solution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.solutions)
  user: User;

  @Column('varchar')
  userId: string;

  @ManyToOne(() => Task, (task) => task.solutions)
  task: Task;

  @Column('varchar')
  taskId: string;

  @Column('varchar')
  solutionCode: string;
}

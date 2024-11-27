import { TaskPriority, TaskStatus } from "src/shared/enums";
import { ITask } from "src/shared/interfaces";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task implements ITask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.BLUE })
  priority: TaskPriority;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  dateOfCreation: Date;

  @Column({ default: true })
  isActive: boolean;
}
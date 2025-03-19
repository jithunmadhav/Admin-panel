import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.model';

export enum Status {
    PENDING = 'pending',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
  }
@Table({ tableName: 'tasks' })
export class Task extends Model {
    @Column
    title: string;
  
    @Column
    description: string;
  
    @Column
    status: Status;
  
    @ForeignKey(() => User)
    @Column
    userId: number;
  
    @BelongsTo(() => User)
    user: User;
}

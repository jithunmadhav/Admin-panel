import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from 'src/task/entities/task.model';
@Table({ tableName: 'users' })
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  mobile:string

  @Column
  password: string;

  @Column
  token:string;

  @HasMany(() => Task)
  tasks: Task[];
}

import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export abstract class GlobalEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    select: false,
  })
  public createdTime: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    select: false,
  })
  public updatedTime: Date;
}

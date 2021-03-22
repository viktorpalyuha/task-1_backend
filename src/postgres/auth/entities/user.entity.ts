import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false,
  })
  full_name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'local',
  })
  evnironment: string;
}

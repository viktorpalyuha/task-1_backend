import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Customer {
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  @Column({
    type: 'varchar',
    length: 50,
    default: 'local',
  })
  evnironment: string;
}

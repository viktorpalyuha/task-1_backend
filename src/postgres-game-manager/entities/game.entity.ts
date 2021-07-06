import { Category } from './category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()


  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  developer: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  price: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

import { Category } from '../category/category.entity';
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
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  img_url: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  developer: string;

  @Column({
    type: 'number',
    nullable: false,
  })
  price: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}

import { User } from './../users/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('animals')
export class Animal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_animal: number;

  @Column()
  name: string;

  @Column()
  hair_color: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  id_user: number;

  @ManyToOne(() => User, (user) => user.animals, { eager: false })
  @JoinColumn({
    name: 'id_user',
  })
  user: User;
}

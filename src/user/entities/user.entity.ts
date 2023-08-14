import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Post } from 'src/post/entities/post.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  gravatar: string;

  @OneToMany(() => Post, (post) => post.id)
  posts: number[];

  @BeforeInsert()
  async hashPassword() {
    console.log('In before insert');
    this.password = await hash(this.password, 10);
  }
}

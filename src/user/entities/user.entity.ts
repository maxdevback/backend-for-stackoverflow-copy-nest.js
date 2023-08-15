import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Post } from 'src/post/entities/post.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { Comment } from 'src/comment/entities/comment.entity';

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
  @JoinColumn()
  posts: Post[];

  @OneToMany(() => Answer, (answer) => answer.id)
  @JoinColumn()
  answers: Answer[];

  @OneToMany(() => Comment, (comment) => comment.id)
  @JoinColumn()
  comments: Comment[];

  @BeforeInsert()
  async hashPassword() {
    console.log('In before insert');
    this.password = await hash(this.password, 10);
  }
}

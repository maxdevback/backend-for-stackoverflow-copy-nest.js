import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  //TODO: change relations to normal
  @OneToMany(() => Answer, (answer) => answer.id)
  @JoinColumn({ name: 'answer_id' })
  answers: Answer[];

  @OneToMany(() => Comment, (comment) => comment.id)
  comment: Comment[];

  @ManyToOne(() => User, (user) => user.id)
  User: User;
}

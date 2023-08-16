import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  body: string;

  @ManyToOne(() => Post, (post) => post.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  post: Post;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}

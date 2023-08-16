import { Post } from 'src/post/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Entity({ name: 'posttag' })
export class PostTag {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, (post) => post.id, { nullable: false })
  @JoinColumn({ name: 'post_id' })
  post_id: number;

  @ManyToOne(() => Tag, (tag) => tag.id, { nullable: false })
  @JoinColumn({ name: 'tag_id' })
  tag_id: number;
}

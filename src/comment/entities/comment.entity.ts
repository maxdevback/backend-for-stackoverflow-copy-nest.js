import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;
}

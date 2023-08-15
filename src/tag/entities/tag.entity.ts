import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tagname: string;

  @Column()
  description: string;
}

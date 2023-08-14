import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  tagname: string;

  @Column()
  description: string;
}

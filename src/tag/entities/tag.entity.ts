import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'tag' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  tagname: string;

  @Column()
  description: string;
}

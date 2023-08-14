import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(5)
  title: string;
  @IsString()
  @Length(25)
  body: string;
  @IsString()
  tagName: string;
}

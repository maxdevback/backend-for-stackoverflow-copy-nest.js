import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AnswerModule } from './answer/answer.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { Tag } from './tag/entities/tag.entity';
import { PostTag } from './tag/entities/posttag.entity';
import { Answer } from './answer/entities/answer.entity';
import { Comment } from './comment/entities/comment.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Post, Tag, PostTag, Answer, Comment],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    AnswerModule,
    TagModule,
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module, NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common/enums';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthMiddleware } from 'src/auth-middleware/auth.middleware';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { PostTag } from 'src/tag/entities/posttag.entity';
import { TagService } from 'src/tag/tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post, Tag, PostTag])],
  controllers: [CommentController],
  providers: [CommentService, UserService, PostService, TagService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: '/posts/comments/:postId',
        method: RequestMethod.POST,
      },
      { path: '/posts/comments/:commentId', method: RequestMethod.DELETE },
    );
  }
}

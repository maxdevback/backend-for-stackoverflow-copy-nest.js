import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { AuthMiddleware } from 'src/auth-middleware/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';
import { PostTag } from 'src/tag/entities/posttag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, User, Post, Tag, PostTag])],
  controllers: [AnswerController],
  providers: [AnswerService, UserService, PostService, TagService],
})
export class AnswerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/posts/answers/:postId',
      method: RequestMethod.POST,
    });
  }
}

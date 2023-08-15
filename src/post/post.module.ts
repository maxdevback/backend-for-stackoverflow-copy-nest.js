import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { AuthMiddleware } from 'src/auth-middleware/auth.middleware';
import { Tag } from 'src/tag/entities/tag.entity';
import { PostTag } from 'src/tag/entities/posttag.entity';
import { TagService } from 'src/tag/tag.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, PostTag, User])],
  controllers: [PostController],
  providers: [PostService, TagService, UserService],
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/posts', method: RequestMethod.POST },
        { path: '/posts/:postId', method: RequestMethod.DELETE },
      );
  }
}

import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import axios from 'axios';
import { Tag } from './entities/tag.entity';
import { PostTag } from './entities/posttag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(PostTag)
    private readonly postTagRepository: Repository<PostTag>,
  ) {}

  async getAll() {
    return await this.tagRepository.find();
  }
  async delete(postId: number) {
    return await this.postTagRepository.query(
      'DELETE FROM posttag WHERE post_id = $1 RETURNING *;',
      [postId],
    );
  }

  async getByTagName(tagname: string) {
    const tag = await this.tagRepository.findOne({
      where: { tagname },
    });
    if (!tag)
      throw new HttpException('This tag dose not exist', HttpStatus.NOT_FOUND);
    return await this.postTagRepository.query(
      'SELECT * FROM posttag WHERE tag_id = $1',
      [tag.id],
    );
  }
  async addTags(tagName: string, postId: number) {
    const tags = tagName.split(',');
    const tagsFromDB = await this.tagRepository.find({
      where: { tagname: In(tags) },
    });
    const tagsWithDesc = tagsFromDB.filter((tag) => tags.includes(tag.tagname));
    const tagnameMap = {};
    tagsFromDB.forEach((tag) => {
      tagnameMap[tag.tagname] = true;
    });

    const tagsWithoutDesc = tags.filter((str) => !tagnameMap[str]);
    const url = `https://api.stackexchange.com/2.3/tags/${tagsWithoutDesc.join(
      ';',
    )}/wikis?site=stackoverflow`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      json: true,
    };
    const newTagsForDB = [];
    if (tagsWithoutDesc[0]) {
      const response = await axios.get(url, options);
      tags.forEach((tag) => {
        const foundTag =
          response.data.items.length &&
          response.data.items.find((t) => t.tag_name === tag.toLowerCase());
        const obj = {
          tagname: tag,
          description: '',
        };

        if (!foundTag) {
          obj.description = `A ${tag} is a keyword or term assigned to a piece of information`;
        } else {
          obj.description = foundTag.excerpt;
        }
        newTagsForDB.push(obj);
      });
    }
    await this.tagRepository.save(newTagsForDB);
    const mapAllTags = [];
    const allTags = [...tagsWithDesc, ...newTagsForDB];
    allTags.forEach((tag, index) => {
      mapAllTags.push({
        post_id: postId,
        tag_id: allTags[index].id,
      });
    });
    this.postTagRepository.save(mapAllTags);
  }
}

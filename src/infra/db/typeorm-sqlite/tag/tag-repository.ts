import { TagModel } from "domain/models";
import { Tag } from "../../../../database/entities/Tag";
import { DbCreateTagRepository } from "../../../../application/protocols/tag/db-create-tag-repository";
import { TypeOrmHelper } from "../helpers/typeorm-helper";

export class TagRepository implements DbCreateTagRepository {
  async create(name: string): Promise<TagModel> {
    const tagNameWithHash = `#${name}`;
    const tagRepo = await TypeOrmHelper.getRepository(Tag);
    const tag = tagRepo.create({ name: tagNameWithHash });
    await tagRepo.save(tag);
    return tag;
  }
}

import { TagModel } from "domain/models";
import { CreateTag } from "domain/usecases/tag/create-tag";
import { DbCreateTagRepository } from "../../protocols/tag/db-create-tag-repository";

export class DbCreateTag implements CreateTag {
  constructor(private readonly dbCreateTagRepository: DbCreateTagRepository) {}

  async create(name: string): Promise<TagModel> {
    const tag = await this.dbCreateTagRepository.create(name);
    return tag;
  }
}

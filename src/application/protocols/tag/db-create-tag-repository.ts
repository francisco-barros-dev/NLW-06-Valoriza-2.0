import { TagModel } from "domain/models";

export interface DbCreateTagRepository {
  create(name: string): Promise<TagModel>;
}

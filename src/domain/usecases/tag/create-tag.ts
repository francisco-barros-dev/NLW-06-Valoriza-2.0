import { TagModel } from "../../models";

export interface CreateTag {
  create(name: string): Promise<TagModel>;
}

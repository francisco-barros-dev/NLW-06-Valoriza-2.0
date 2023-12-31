import faker from "faker";
import { TagRepository } from "./tag-repository";
import { TypeOrmHelper } from "../helpers/typeorm-helper";

describe("TagRepository", () => {
  beforeAll(async () => {
    await TypeOrmHelper.connectSqliteInMemory();
  });

  beforeEach(async () => {
    await TypeOrmHelper.dropAllTables();
  });

  afterAll(async () => {
    await TypeOrmHelper.disconnect();
  });

  test("Should return a tag on success ", async () => {
    const sut = new TagRepository();
    const tag = await sut.create(faker.random.word());

    expect(tag).toBeTruthy();
    expect(tag.id).toBeTruthy();
    expect(tag.name).toBeTruthy();
    expect(tag.created_at).toBeTruthy();
    expect(tag.updated_at).toBeTruthy();
  });
});

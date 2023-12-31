import { DbCreateTagRepository } from "application/protocols/tag/db-create-tag-repository";
import { TagModel } from "domain/models";
import MockDate from "mockdate";
import faker from "faker";
import { DbCreateTag } from "./db-create-tag";

const fakeTag = {
  id: faker.datatype.uuid(),
  name: faker.random.word(),
  created_at: new Date(),
  updated_at: new Date(),
};
const makeFakeTag = (): TagModel => fakeTag;

const makeDbCreateTagRepository = (): DbCreateTagRepository => {
  class DbCreateTagRepositoryStub implements DbCreateTagRepository {
    async create(name: string): Promise<TagModel> {
      return Promise.resolve(makeFakeTag());
    }
  }
  return new DbCreateTagRepositoryStub();
};

type SutTypes = {
  sut: DbCreateTag;
  dbCreateTagRepositoryStub: DbCreateTagRepository;
};

const makeSut = (): SutTypes => {
  const dbCreateTagRepositoryStub = makeDbCreateTagRepository();
  const sut = new DbCreateTag(dbCreateTagRepositoryStub);
  return {
    sut,
    dbCreateTagRepositoryStub,
  };
};

describe("DbCreateTag", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Should call DbCreateTagRepository with correct value", async () => {
    const { sut, dbCreateTagRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(dbCreateTagRepositoryStub, "create");
    await sut.create(fakeTag.name);
    expect(createSpy).toBeCalledWith(fakeTag.name);
  });

  test("Should return a tag on success", async () => {
    const { sut } = makeSut();
    const tag = await sut.create(fakeTag.name);
    expect(tag).toEqual(makeFakeTag());
  });

  test("Should throw if DbCreateTagRepository throws", async () => {
    const { sut, dbCreateTagRepositoryStub } = makeSut();

    jest
      .spyOn(dbCreateTagRepositoryStub, "create")
      .mockReturnValueOnce(Promise.reject(new Error()));

    const promise = sut.create(fakeTag.name);
    await expect(promise).rejects.toThrow();
  });
});

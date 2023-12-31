import {
  Connection,
  createConnection,
  EntityTarget,
  Repository,
} from "typeorm";
import entities from "../../../../database/entities";

export class TypeOrmHelper {
  private constructor() {}

  private static connection: Connection;

  static async connectSqliteInMemory(): Promise<void> {
    if (!this.isConnected()) {
      this.connection = await createConnection({
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        entities,
        synchronize: true,
        logging: false,
      });
    }
  }

  static async connect(): Promise<void> {
    if (!this.isConnected()) {
      this.connection = await createConnection();
    }
  }

  static getConnection(): Connection {
    return this.connection;
  }

  static async getRepository<T>(
    entity: EntityTarget<T>
  ): Promise<Repository<T>> {
    if (!this.isConnected()) {
      return null;
    }
    const repository = this.connection.getRepository(entity);
    return repository;
  }

  static isConnected(): boolean {
    if (!this.connection || !this.connection.isConnected) {
      return false;
    }
    return true;
  }

  static async disconnect(): Promise<void> {
    if (!this.isConnected()) {
      return;
    }
    this.connection.close();
  }

  static async dropAllTables(): Promise<void> {
    if (!this.isConnected()) {
      return;
    }
    await this.connection.synchronize(true);
  }
}

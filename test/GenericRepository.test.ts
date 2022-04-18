import GenericRepository from "../src/repositories/GenericRepository";
import db from "../src/database";
import environment from "../src/environment";
import { PoolClient } from "pg"

let repository;
let client: PoolClient;
class Test extends GenericRepository<any> {
    constructor(tableName: string, unbindedColumnsClass?: string[]) {
        super(tableName, unbindedColumnsClass);
    }
};

beforeAll(async () => {
    client = await db.connect();
    repository = new Test("test");
});

afterAll(async () => {
    await client.release();
});

beforeEach(async () => {
    await clearTable();
});

afterEach(async () => {
    await clearTable();
});

test("getAll", async () => {
    await client.query<any>(`INSERT INTO ${environment.db_table_suffix}_test(id, name) VALUES (1, 'test')`);
    await client.query<any>(`INSERT INTO ${environment.db_table_suffix}_test(id, name) VALUES (2, 'test2')`);
    const res = await repository.getAll();
    expect(res.length).toBe(2);
});

test("getById", async () => {
    await client.query<any>(`INSERT INTO ${environment.db_table_suffix}_test(id, name) VALUES (1, 'test')`);
    const res = await repository.getById(1);
    expect(res).toBeDefined();
    expect(res.name).toBe("test");
});

test("create", async () => {
    const res = await repository.create({ id: 1, name: "test" });
    expect(res).toBeDefined();
    expect(res.name).toBe("test");
});

test("create without id", async () => {
    const res = await repository.create({ name: "test" });
    expect(res).toBeDefined();
    expect(res.name).toBe("test");
});

test("update", async () => {
    await client.query<any>(`INSERT INTO ${environment.db_table_suffix}_test(id, name) VALUES (1, 'test')`);
    const res = await repository.update({ id: 1, name: "test2" });
    expect(res).toBeDefined();
    expect(res.name).toBe("test2");
});

test("delete", async () => {
    await client.query<any>(`INSERT INTO ${environment.db_table_suffix}_test(id, name) VALUES (1, 'test')`);
    await repository.delete(1);
    const res = await repository.getById(1);
    expect(res).toBe(undefined);
});

function clearTable() {
    return db.connect().then(client => {
        return client.query(`DELETE FROM ${environment.db_table_suffix}_test`).then(() => {
            client.release();
        });
    });
}
import { InternalServerError } from 'routing-controllers';
import environment from '../environment';
import db from '../database';

export default abstract class GenericRepository<T> {

    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async getAll(): Promise<T[]> {
        try {
            const client = await db.connect();
            const res = await client.query<T>(`SELECT * FROM ${environment.db_table_suffix}_${this.tableName}`);
            client.release();
            return res.rows;
        } catch (error) {
            throw new InternalServerError('Une erreur s\'est produite, veuillez réessayer plus tard');
        }
    }

    async getById(id: number): Promise<T> {
        try {
            const client = await db.connect();
            const res = await client.query<T>({
                name: 'getByIdGenericRepository',
                text: `SELECT * FROM ${environment.db_table_suffix}_${this.tableName} WHERE id = $1`,
                values: [id],
              });
            client.release();
            return res.rows[0];
        } catch (error) {
            throw new InternalServerError('Une erreur s\'est produite, veuillez réessayer plus tard');
        }
    }

    async create(entity: T): Promise<T> {
        try {
            const client = await db.connect();
            const res = await client.query<T>({
                name: 'createGenericRepository',
                text: `INSERT INTO ${environment.db_table_suffix}_${this.tableName}(${Object.keys(entity).join(',')}) VALUES ($${Array.from(Array(Object.keys(entity).length).keys()).map((item) => ++item).join(',$')})`,
                values: Object.values(entity),
              });
            client.release();
            return entity;
        } catch (error) {
            throw new InternalServerError('Une erreur s\'est produite, veuillez réessayer plus tard');
        }
    }

    async update(entity: T): Promise<T> {
        try {
            const client = await db.connect();
            const res = await client.query<T>({
                name: 'updateGenericRepository',
                text: `UPDATE ${environment.db_table_suffix}_${this.tableName} SET ${Object.keys(entity).filter(item => item !== "id").map((item, index) => item + ' = $' + index).join(',')} WHERE id = $1`,
                values: Object.keys(entity).filter(item => item !== "id").map(item => entity[item as keyof T]),
              });
              console.log(res);
            client.release();
            return res.rows[0];
        } catch (error) {
            throw new InternalServerError('Une erreur s\'est produite, veuillez réessayer plus tard');
        }
    }

    async delete(id: number): Promise<T> {
        try {
            const client = await db.connect();
            const res = await client.query<T>({
                name: 'deleteGenericRepository',
                text: `DELETE FROM ${environment.db_table_suffix}_${this.tableName} WHERE id = $1`,
                values: [id],
              });
              console.log(res);
            client.release();
            return res.rows[0];
        } catch (error) {
            throw new InternalServerError('Une erreur s\'est produite, veuillez réessayer plus tard');
        }
    }
}

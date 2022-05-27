import { InternalServerError } from 'routing-controllers';
import environment from '../environment';
import db from '../database';

export default abstract class GenericRepository<T extends {id?: number}> {

    private tableName: string;
    private unbindedColumnsClass: string[];

    constructor(tableName: string, unbindedColumnsClass?: string[]) {
        this.tableName = tableName;
        this.unbindedColumnsClass = unbindedColumnsClass;
    }

    async getAll(unbindedColumnsFunction?: string[]): Promise<T[]> {
        try {
            const client = await db.connect();
            const res = await client.query<T>(`SELECT * FROM ${environment.db_table_prefix}_${this.tableName}`);
            client.release();
            return res.rows.map(item => this.unbindColumns(item, unbindedColumnsFunction));
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id: number, unbindedColumnsFunction?: string[]): Promise<T> {
        try {
            const client = await db.connect();
            const res = await client.query<T>({
                name: 'getByIdGenericRepository',
                text: `SELECT * FROM ${environment.db_table_prefix}_${this.tableName} WHERE id = $1`,
                values: [id],
              });
            client.release();
            return res.rows.map(item => this.unbindColumns(item, unbindedColumnsFunction))[0];
        } catch (error) {
            console.log(error);
        }
    }

    async create(entity: T, unbindedColumnsFunction?: string[]): Promise<T> {
        try {
            const client = await db.connect();

            entity = this.prepareEntity(entity);
            const columns = Object.keys(entity).join(',');
            const values = Array.from(Array(Object.keys(entity).length).keys()).map((item) => ++item).join(',$');

            const res = await client.query<T>({
                name: 'createGenericRepository',
                text: `INSERT INTO ${environment.db_table_prefix}_${this.tableName}(${columns}) VALUES ($${values}) RETURNING *`,
                values: Object.values(entity)
            });
            client.release();
            return res.rows.map(item => this.unbindColumns(item, unbindedColumnsFunction))[0];
        } catch (error) {
            console.log(error);
        }
    }

    async where(columns: string[], values: any[], unbindedColumnsFunction?: string[]): Promise<T[]> {
        try {
            const client = await db.connect();

            const conditions = columns.map((item, index) => item + ' = $' + (index+1)).join(' AND ');

            const res = await client.query<T>({
                name: 'whereGenericRepository',
                text: `SELECT * FROM ${environment.db_table_prefix}_${this.tableName} WHERE ${conditions}`,
                values
            });
            client.release();
            return res.rows.map(item => this.unbindColumns(item, unbindedColumnsFunction));
        } catch (error) {
            console.log(error);
        }
    }

    async update(entity: T, unbindedColumnsFunction?: string[]): Promise<T> {
        try {
            const client = await db.connect();

            const id = entity.id;
            entity = this.prepareEntity(entity);
            const columns = Object.keys(entity).map((item, index) => item + ' = $' + (index+1)).join(',');

            const res = await client.query<T>({
                name: 'updateGenericRepository',
                text: `UPDATE ${environment.db_table_prefix}_${this.tableName} SET ${columns} WHERE id = $${Object.keys(entity).length + 1} RETURNING *`,
                values: Object.values(entity).concat(id)
            });
            client.release();
            return res.rows.map(item => this.unbindColumns(item, unbindedColumnsFunction))[0];
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id: number): Promise<T> {
        try {
            const client = await db.connect();
            const res = await client.query<T>({
                name: 'deleteGenericRepository',
                text: `DELETE FROM ${environment.db_table_prefix}_${this.tableName} WHERE id = $1 RETURNING *`,
                values: [id],
            });
            client.release();
            return res.rows.map(item => this.unbindColumns(item, []))[0];
        } catch (error) {
            console.log(error);
        }
    }

    private unbindColumns(entity: T, unbindedColumnsFunction: string[]): T {
        const newEntity = {} as T;
        Object.keys(entity).forEach((key) => {
            if ((!this.unbindedColumnsClass || this.unbindedColumnsClass.indexOf(key) === -1)
                && (!unbindedColumnsFunction ||unbindedColumnsFunction.indexOf(key) === -1)) {
                newEntity[key as keyof T] = entity[key as keyof T];
            }
        });
        return newEntity;
    }

    private prepareEntity(entity: T): T {
        if(entity.id !== undefined && entity.id !== null) {
            delete entity.id;
        }
        return entity;
    }
}

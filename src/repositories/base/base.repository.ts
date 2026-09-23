import { 
    DeepPartial, 
    DeleteResult, 
    FindManyOptions, 
    FindOneOptions, 
    FindOptionsOrder, 
    FindOptionsWhere, 
    InsertResult, 
    QueryDeepPartialEntity, 
    Repository, 
    UpdateResult } from "typeorm";
import { IBaseRepository } from "./base.interface.repository";

export abstract class BaseRepository<T> implements IBaseRepository<T>{
    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }
    
    async findOne(options: FindOneOptions<T>): Promise<T> {
        return this.entity.findOne(options);
    }

    async find(options?: FindManyOptions<T>): Promise<T[]> {
        return await this.entity.find({
            order: { id: 'DESC' } as unknown as FindOptionsOrder<T>,
            ...options,
        });
    }

    async insert(payload: DeepPartial<T>): Promise<T> {
        const object = this.entity.create(payload);
        //@ts-ignore
        await this.entity.insert(object);
        return object;
    }

    async insertMany(payload: DeepPartial<T>[]): Promise<void> {
        await this.entity.save(payload);
    }

    async update(
    id: number,
    payload: QueryDeepPartialEntity<T>,
    ): Promise<UpdateResult> {
        return await this.entity.update(id, payload);
    }

    async upsert(
    payload: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
    conflictPaths: string[],
    ): Promise<InsertResult> {
        return await this.entity.upsert(payload, conflictPaths);
    }

    async softDelete(id: number): Promise<UpdateResult> {
        return await this.entity.softDelete(id);
    }

    async restore(id: number): Promise<UpdateResult> {
        return await this.entity.restore(id);
    }

    async delete(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
        return await this.entity.delete(criteria);
    }

    async deleteById(id: number): Promise<DeleteResult> {
       return await this.entity.delete(id);
    }
}
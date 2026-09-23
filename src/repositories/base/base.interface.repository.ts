import { 
    DeepPartial, 
    DeleteResult, 
    FindManyOptions, 
    FindOneOptions, 
    FindOptionsWhere, 
    InsertResult, 
    QueryDeepPartialEntity, 
    UpdateResult 
} from "typeorm";

export interface IBaseRepository<T> {
    findOne(options: FindOneOptions): Promise<T | null>;
    find(options?: FindManyOptions<T>): Promise<T[]>;
    insert(payload: DeepPartial<T>): Promise<T>;
    insertMany(payload: DeepPartial<T>[]): Promise<void>;
    update(id: number, payload: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
    upsert(
        payload: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[],
        conflictPaths: string[],
    ): Promise<InsertResult>;
    softDelete(id: number): Promise<UpdateResult>;
    restore(id: number): Promise<UpdateResult>;
    deleteById(id: number): Promise<DeleteResult>;
    delete(criteria: FindOptionsWhere<T>): Promise<DeleteResult>;
}
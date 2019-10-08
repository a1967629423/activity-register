import Joi from '@hapi/joi';
export default Joi;
type mixed = {
    [key: string]: any;
} | object | number | string | boolean | symbol | undefined | null | void;
class Type<A>{
    readonly _A: A = {} as A;
}
interface Props {
    [key: string]: Mixed;
}
interface Any extends Type<any> {

}
interface Mixed extends Type<any> {
}
export type TypeOf<RT extends Any> = RT['_A'];
declare module '@hapi/joi' {

    export class BaseTypeFactor<T extends Any> extends Type<T['_A']>{
        validate(value: any, options?: Joi.ValidationOptions): Joi.ValidationResult<T['_A']>
    }
    export class ArrayTypeFactor<T extends Any> extends Type<T['_A']>{
        /**
    * Verifies that an assertion passes for at least one item in the array, where:
    * `schema` - the validation rules required to satisfy the assertion. If the `schema` includes references, they are resolved against
    * the array item being tested, not the value of the `ref` target.
    */
        has(schema: SchemaLike): this;
        /**
         * Allow this array to be sparse.
         * enabled can be used with a falsy value to go back to the default behavior.
         */
        sparse(enabled?: any): this;

        /**
         * Allow single values to be checked against rules as if it were provided as an array.
         * enabled can be used with a falsy value to go back to the default behavior.
         */
        single(enabled?: any): this;

        /**
         * List the types allowed for the array values.
         * type can be an array of values, or multiple values can be passed as individual arguments.
         * If a given type is .required() then there must be a matching item in the array.
         * If a type is .forbidden() then it cannot appear in the array.
         * Required items can be added multiple times to signify that multiple items must be found.
         * Errors will contain the number of items that didn't match.
         * Any unmatched item having a label will be mentioned explicitly.
         *
         * @param type - a joi schema object to validate each array item against.
         */
        items<R extends Joi.SchemaLike & Any>(...types: R[]): ArraySchemaA<Type<R['_A'][]>>
        items<R extends Joi.SchemaLike & Any>(types: R[]): ArraySchemaA<Type<R['_A']>>
        items<R>(...types: R[]): ArraySchemaA<Type<R[]>>

        /**
         * Lists the types in sequence order for the array values where:
         * @param type - a joi schema object to validate against each array item in sequence order. type can be an array of values, or multiple values can be passed as individual arguments.
         * If a given type is .required() then there must be a matching item with the same index position in the array.
         * Errors will contain the number of items that didn't match.
         * Any unmatched item having a label will be mentioned explicitly.
         */
        ordered(...types: SchemaLike[]): this;
        ordered(types: SchemaLike[]): this;

        /**
         * Specifies the minimum number of items in the array.
         */
        min(limit: number): this;

        /**
         * Specifies the maximum number of items in the array.
         */
        max(limit: number): this;

        /**
         * Specifies the exact number of items in the array.
         */
        length(limit: number | Reference): this;

        /**
         * Requires the array values to be unique.
         * Be aware that a deep equality is performed on elements of the array having a type of object,
         * a performance penalty is to be expected for this kind of operation.
         */
        unique(comparator?: string): this;
        unique<T = any>(comparator?: (a: T, b: T) => boolean): this;

    }
    export type WhenOptionsA<A extends Any> = {
        /**
 * the required condition joi type.
 */
        is: SchemaLike;
        /**
         * the alternative schema type if the condition is true. Required if otherwise is missing.
         */
        then?: SchemaLike &A ;
        /**
         * the alternative schema type if the condition is false. Required if then is missing
         */
        otherwise?: SchemaLike;
    }
    export class AlternativesTypeFactor<T extends Any> extends Type<T['_A']>{
        try(types: SchemaLike[]): this;
        try(...types: SchemaLike[]): this;
        when<P extends Any>(ref: string | Reference, options: WhenOptionsA<P>): AlternativesSchemaA<P>;
        when(ref: Schema, options: WhenSchemaOptions): this;
    }
    export type ObjectSchemaA<T extends Any> = Joi.ObjectSchema & BaseTypeFactor<T>
    export type StringSchemaA<T extends Any> = Joi.StringSchema & BaseTypeFactor<T>
    export type NumberSchemaA<T extends Any> = Joi.NumberSchema & BaseTypeFactor<T>
    export type BooleanSchemaA<T extends Any> = Joi.BooleanSchema & BaseTypeFactor<T>
    export type ArraySchemaA<T extends Any> = & ArrayTypeFactor<T> & Joi.AnySchemaA<T>
    export type AnySchemaA<T extends Any> = Joi.AnySchema & BaseTypeFactor<T>
    export type AlternativesSchemaA<T extends Any> =  Joi.AnySchema & AlternativesTypeFactor<T>
    export type ParamType<R extends Props> = Type<{ [K in keyof R]: TypeOf<R[K]> }>;

    export function object<R extends Props>(required: R): ObjectSchemaA<ParamType<R>>
    export function string(): StringSchemaA<Type<string>>
    export function number(): NumberSchemaA<Type<number>>
    export function boolean(): BooleanSchemaA<Type<boolean>>
    export function bool(): BooleanSchemaA<Type<boolean>>
    export function array(): ArraySchemaA<Type<any[]>>
    //I don't know
    export function when<P extends Any>(ref: string | Reference, options: WhenOptionsA<P>): AlternativesSchemaA<P>;
    export function any(): AnySchemaA<any>
}





import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  ObjectId,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { Types } from 'mongoose';

@ObjectType('Role')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
export class RoleDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  role_name!: string;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @FilterableField({ nullable: true })
  created_by?: string;

  @FilterableField({ nullable: true })
  updated_by?: string;
}

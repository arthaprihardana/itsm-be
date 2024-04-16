import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  BeforeUpdateMany,
  BeforeUpdateOne,
  CreateManyInputType,
  CreateOneInputType,
  CursorConnection,
  FilterableField,
  KeySet,
  ObjectId,
  QueryOptions,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { Types } from 'mongoose';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { TodoItemDto } from 'src/todo-item/todo-item.dto/todo-item.dto';

@ObjectType('Tag')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@CursorConnection('todoItems', () => TodoItemDto)
@BeforeCreateOne((input: CreateOneInputType<TagDto>, context: GqlContext) => {
  input.input.createdBy = getUserName(context);
  return input;
})
@BeforeCreateMany((input: CreateManyInputType<TagDto>, context: GqlContext) => {
  const createdBy = getUserName(context);
  input.input = input.input.map((c) => ({ ...c, createdBy }));
  return input;
})
@BeforeUpdateOne((input: UpdateOneInputType<TagDto>, context: GqlContext) => {
  input.update.updatedBy = getUserName(context);
  return input;
})
@BeforeUpdateMany(
  (input: UpdateManyInputType<TagDto, TagDto>, context: GqlContext) => {
    input.update.updatedBy = getUserName(context);
    return input;
  },
)
export class TagDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  name!: string;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField({ nullable: true })
  createdBy?: string;

  @FilterableField({ nullable: true })
  updatedBy?: string;
}

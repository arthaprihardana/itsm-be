import {
  FilterableField,
  KeySet,
  ObjectId,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { ID, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { TodoItemDto } from 'src/todo-item/todo-item.dto/todo-item.dto';
import { Types } from 'mongoose';

@ObjectType('SubTask')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@Relation('todoItem', () => TodoItemDto, {
  update: { enabled: true },
})
export class SubTaskDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  title!: string;

  @FilterableField({ nullable: true })
  description?: string;

  @FilterableField()
  completed!: boolean;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField({ nullable: true })
  createdBy?: string;

  @FilterableField({ nullable: true })
  updatedBy?: string;
}

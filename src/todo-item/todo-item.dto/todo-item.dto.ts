import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  KeySet,
  ObjectId,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth.guard';
import { SubTaskDto } from 'src/sub-task/sub-task.dto/sub-task.dto';
import { TagDto } from 'src/tag/tag.dto/tag.dto';

@ObjectType('TodoItem')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@CursorConnection('subTasks', () => SubTaskDto, {
  update: { enabled: true },
  guards: [AuthGuard],
})
@CursorConnection('tags', () => TagDto, {
  update: { enabled: true },
  remove: { enabled: true },
  guards: [AuthGuard],
})
export class TodoItemDto {
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

  @Field()
  age!: number;

  @FilterableField()
  priority!: number;

  @FilterableField({ nullable: true })
  createdBy?: string;

  @FilterableField({ nullable: true })
  updatedBy?: string;
}

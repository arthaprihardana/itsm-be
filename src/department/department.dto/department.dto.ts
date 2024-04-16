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
import { ResourceDto } from 'src/resource/resource.dto/resource.dto';

@ObjectType('Department')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@CursorConnection('resources', () => ResourceDto, {
  update: { enabled: true },
  remove: { enabled: true },
  guards: [AuthGuard],
})
export class DepartmentDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  department_name!: string;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @FilterableField({ nullable: true })
  created_by?: string;

  @FilterableField({ nullable: true })
  updated_by?: string;
}

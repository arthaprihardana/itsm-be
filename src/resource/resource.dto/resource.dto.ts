import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  ObjectId,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Types } from 'mongoose';
import { DepartmentDto } from 'src/department/department.dto/department.dto';
import { RoleDto } from 'src/role/role.dto/role.dto';
// import { ResourceStatus } from '../status.enum';

@ObjectType('Resource')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@Relation('department_name', () => DepartmentDto, {
  update: { enabled: true },
  remove: { enabled: false },
})
@Relation('resources_role', () => RoleDto, {
  update: { enabled: true },
  remove: { enabled: false },
})
export class ResourceDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  resources_name!: string;

  @FilterableField()
  status!: string;

  @FilterableField({ nullable: true })
  resign_date?: Date;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @FilterableField({ nullable: true })
  created_by?: string;

  @FilterableField({ nullable: true })
  updated_by?: string;
}

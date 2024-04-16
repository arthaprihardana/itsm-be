import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  CursorConnection,
  FilterableField,
  KeySet,
  ObjectId,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Types } from 'mongoose';
import { AuthGuard } from 'src/auth.guard';
import { ProjectDto } from 'src/project/project.dto/project.dto';
import { StakeholderDto } from 'src/stakeholder/stakeholder.dto/stakeholder.dto';

@ObjectType('Product')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@Relation('stakeholder', () => StakeholderDto, {
  update: { enabled: true },
  remove: { enabled: true },
  guards: [AuthGuard],
})
@CursorConnection('projects', () => ProjectDto, {
  update: { enabled: true },
  remove: { enabled: true },
  guards: [AuthGuard],
})
export class ProductDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  product_name!: string;

  @FilterableField()
  product_description!: string;

  @FilterableField()
  product_category!: string;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @FilterableField({ nullable: true })
  created_by?: string;

  @FilterableField({ nullable: true })
  updated_by?: string;
}

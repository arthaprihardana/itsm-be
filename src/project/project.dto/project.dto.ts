import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  KeySet,
  ObjectId,
  QueryOptions,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Types } from 'mongoose';
import { ProductDto } from 'src/product/product.dto/product.dto';
import { ResourceDto } from 'src/resource/resource.dto/resource.dto';

@ObjectType('Project')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@Relation('pmo', () => ResourceDto, {
  nullable: true,
  update: { enabled: true },
  remove: { enabled: false },
})
@Relation('product', () => ProductDto, {
  update: { enabled: true },
  remove: { enabled: true },
})
export class ProjectDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  project_sr!: string;

  @FilterableField()
  project_name!: string;

  @FilterableField()
  project_description!: string;

  @FilterableField()
  mandays!: number;

  @FilterableField()
  target_revenue!: number;

  @FilterableField({ nullable: true })
  actual_revenue?: number;

  @FilterableField()
  score!: number;

  @FilterableField({ nullable: true })
  rollout_date?: Date;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @FilterableField({ nullable: true })
  created_by?: string;

  @FilterableField({ nullable: true })
  updated_by?: string;
}

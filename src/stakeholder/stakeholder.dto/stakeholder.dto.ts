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
import { ProductDto } from 'src/product/product.dto/product.dto';

@ObjectType('Stakeholder')
@KeySet(['id'])
@QueryOptions({ enableTotalCount: true })
@CursorConnection('products', () => ProductDto, {
  update: { enabled: true },
  remove: { enabled: false },
  guards: [AuthGuard],
})
export class StakeholderDto {
  @ObjectId()
  _id: Types.ObjectId;

  @FilterableField(() => ID)
  id!: string;

  @FilterableField()
  stakeholder_name!: string;

  @FilterableField()
  business_unit!: string;

  @Field(() => GraphQLISODateTime)
  created_at!: Date;

  @Field(() => GraphQLISODateTime)
  updated_at!: Date;

  @FilterableField({ nullable: true })
  created_by?: string;

  @FilterableField({ nullable: true })
  updated_by?: string;
}

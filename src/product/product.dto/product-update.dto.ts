import { Field, InputType } from '@nestjs/graphql';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { ProductDto } from './product.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsOptional, IsString } from 'class-validator';

@InputType('ProductUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<ProductDto>, context: GqlContext) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
@BeforeUpdateMany(
  (input: UpdateManyInputType<ProductDto, ProductDto>, context: GqlContext) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
export class ProductUpdateDto {
  @IsString()
  @Field()
  @IsOptional()
  product_name?: string;

  @IsString()
  @Field()
  @IsOptional()
  product_description?: string;

  @IsString()
  @Field()
  @IsOptional()
  product_category?: string;
}

import { Field, ID, InputType } from '@nestjs/graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { ProductDto } from './product.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('ProductInput')
@BeforeCreateOne(
  (input: CreateOneInputType<ProductDto>, context: GqlContext) => {
    input.input.created_by = getUserName(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<ProductDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class ProductInputDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  product_name!: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  product_description!: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  product_category!: string;

  @Field(() => ID)
  @IsNotEmpty()
  stakeholder!: string;
}

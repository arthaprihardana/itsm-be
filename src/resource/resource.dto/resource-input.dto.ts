import { Field, GraphQLISODateTime, ID, InputType } from '@nestjs/graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { ResourceDto } from './resource.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { ResourceStatus } from '../status.enum';

@InputType('ResourceInput')
@BeforeCreateOne(
  (input: CreateOneInputType<ResourceDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.input.created_by = getUserName(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<ResourceDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    // eslint-disable-next-line no-param-reassign
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class ResourceInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  resources_name!: string;

  @Field(() => ID)
  @IsNotEmpty()
  resources_role!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsOptional()
  @Field(() => GraphQLISODateTime, { nullable: true })
  resign_date?: Date;

  @Field(() => ID)
  @IsNotEmpty()
  department_name!: string;
}

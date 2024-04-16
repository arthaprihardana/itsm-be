import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { ResourceDto } from './resource.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsOptional, IsString } from 'class-validator';
// import { ResourceStatus } from '../status.enum';

@InputType('ResourcesUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<ResourceDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.update.updated_by = getUserName(context);
    return input;
  },
)
@BeforeUpdateMany(
  (
    input: UpdateManyInputType<ResourceDto, ResourceDto>,
    context: GqlContext,
  ) => {
    // eslint-disable-next-line no-param-reassign
    input.update.updated_by = getUserName(context);
    return input;
  },
)
export class ResourceUpdateDto {
  @Field()
  @IsOptional()
  @IsString()
  resources_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  resources_role?: string;

  @Field()
  @IsString()
  @IsOptional()
  status!: string;

  @IsOptional()
  @Field(() => GraphQLISODateTime, { nullable: true })
  resign_date?: Date;

  @Field({ nullable: true })
  @IsOptional()
  department_name?: string;
}

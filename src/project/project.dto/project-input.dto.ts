import { Field, ID, InputType } from '@nestjs/graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { ProjectDto } from './project.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType('ProjectInput')
@BeforeCreateOne(
  (input: CreateOneInputType<ProjectDto>, context: GqlContext) => {
    input.input.created_by = getUserName(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<ProjectDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class ProjectInputDto {
  @IsString()
  @Field()
  @IsNotEmpty()
  project_sr!: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  project_name!: string;

  @IsString()
  @Field()
  @IsNotEmpty()
  project_description!: string;

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  pmo?: string;

  @IsString()
  @Field(() => ID)
  @IsNotEmpty()
  product!: string;

  @IsNumber()
  @Field()
  mandays!: number;

  @IsNumber()
  @Field()
  target_revenue!: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  actual_revenue?: number;

  @IsNumber()
  @Field()
  score!: number;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  rollout_date?: Date;
}

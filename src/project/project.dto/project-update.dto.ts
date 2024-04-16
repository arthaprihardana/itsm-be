import { Field, ID, InputType } from '@nestjs/graphql';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { ProjectDto } from './project.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('ProjectUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<ProjectDto>, context: GqlContext) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
@BeforeUpdateMany(
  (input: UpdateManyInputType<ProjectDto, ProjectDto>, context: GqlContext) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  project_sr?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  project_name?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  project_description?: string;

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  pmo?: string;

  @IsOptional()
  @IsString()
  @Field(() => ID, { nullable: true })
  product?: string;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  mandays?: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  target_revenue?: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  actual_revenue?: number;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  score?: number;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  rollout_date?: Date;
}

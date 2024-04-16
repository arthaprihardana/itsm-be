import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { Field, InputType } from '@nestjs/graphql';
import { SubTaskDto } from './sub-task.dto';
import { getUserName } from 'src/helpers';
import { GqlContext } from 'src/auth.guard';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType('SubTaskUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<SubTaskDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.update.updatedBy = getUserName(context);
    return input;
  },
)
@BeforeUpdateMany(
  (input: UpdateManyInputType<SubTaskDto, SubTaskDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.update.updatedBy = getUserName(context);
    return input;
  },
)
export class SubtaskUpdateDto {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  todoItem?: string;
}

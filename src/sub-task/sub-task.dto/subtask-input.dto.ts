import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { Field, ID, InputType } from '@nestjs/graphql';
import { SubTaskDto } from './sub-task.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

@InputType('SubTaskInput')
@BeforeCreateOne(
  (input: CreateOneInputType<SubTaskDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.input.createdBy = getUserName(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<SubTaskDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    // eslint-disable-next-line no-param-reassign
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class SubtaskInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @Field()
  @IsBoolean()
  completed!: boolean;

  @Field(() => ID)
  @IsNotEmpty()
  todoItem!: string;
}

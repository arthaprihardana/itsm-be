import { Field, InputType } from '@nestjs/graphql';
import { TodoItemDto } from './todo-item.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';

@InputType('TodoItemUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<TodoItemDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.update.updatedBy = getUserName(context);
    return input;
  },
)
@BeforeUpdateMany(
  (
    input: UpdateManyInputType<TodoItemDto, TodoItemDto>,
    context: GqlContext,
  ) => {
    // eslint-disable-next-line no-param-reassign
    input.update.updatedBy = getUserName(context);
    return input;
  },
)
export class TodoItemUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  @Field({ nullable: true })
  title?: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  completed?: boolean;

  @IsOptional()
  @IsNumber()
  @Field({ nullable: true })
  priority?: number;
}

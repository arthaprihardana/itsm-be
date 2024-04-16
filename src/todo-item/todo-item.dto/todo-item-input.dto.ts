import { Field, InputType } from '@nestjs/graphql';
import { TodoItemDto } from './todo-item.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsBoolean, IsString, MaxLength } from 'class-validator';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';

@InputType('TodoItemInput')
@BeforeCreateOne(
  (input: CreateOneInputType<TodoItemDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.input.createdBy = getUserName(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<TodoItemDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    // eslint-disable-next-line no-param-reassign
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class TodoItemInputDto {
  @IsString()
  @MaxLength(20)
  @Field()
  title!: string;

  @IsBoolean()
  @Field()
  completed!: boolean;
}

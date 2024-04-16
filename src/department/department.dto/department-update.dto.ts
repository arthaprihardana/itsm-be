import { Field, InputType } from '@nestjs/graphql';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { IsOptional, IsString } from 'class-validator';
import { DepartmentDto } from './department.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';

@InputType('DepartmentUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<DepartmentDto>, context: GqlContext) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
@BeforeUpdateMany(
  (
    input: UpdateManyInputType<DepartmentDto, DepartmentDto>,
    context: GqlContext,
  ) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
export class DepartmentUpdateDto {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  department_name?: string;
}

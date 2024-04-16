import { Field, InputType } from '@nestjs/graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { IsString } from 'class-validator';
import { DepartmentDto } from './department.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';

@InputType('DepartmentInput')
@BeforeCreateOne(
  (input: CreateOneInputType<DepartmentDto>, context: GqlContext) => {
    input.input.created_by = getUserName(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<DepartmentDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class DepartmentInputDto {
  @IsString()
  @Field()
  department_name!: string;
}

import { Field, InputType } from '@nestjs/graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { RoleDto } from './role.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('RoleInput')
@BeforeCreateOne((input: CreateOneInputType<RoleDto>, context: GqlContext) => {
  // eslint-disable-next-line no-param-reassign
  input.input.created_by = getUserName(context);
  return input;
})
@BeforeCreateMany(
  (input: CreateManyInputType<RoleDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    // eslint-disable-next-line no-param-reassign
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class RoleInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  role_name!: string;
}

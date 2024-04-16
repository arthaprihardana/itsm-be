import { Field, InputType } from '@nestjs/graphql';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { RoleDto } from './role.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType('RoleUpdate')
@BeforeUpdateOne((input: UpdateOneInputType<RoleDto>, context: GqlContext) => {
  // eslint-disable-next-line no-param-reassign
  input.update.updated_by = getUserName(context);
  return input;
})
@BeforeUpdateMany(
  (input: UpdateManyInputType<RoleDto, RoleDto>, context: GqlContext) => {
    // eslint-disable-next-line no-param-reassign
    input.update.updated_by = getUserName(context);
    return input;
  },
)
export class RoleUpdateDto {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  role_name?: string;
}

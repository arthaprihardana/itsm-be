import { Field, InputType } from '@nestjs/graphql';
import {
  BeforeUpdateMany,
  BeforeUpdateOne,
  UpdateManyInputType,
  UpdateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { StakeholderDto } from './stakeholder.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsOptional, IsString } from 'class-validator';

@InputType('StakeholderUpdate')
@BeforeUpdateOne(
  (input: UpdateOneInputType<StakeholderDto>, context: GqlContext) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
@BeforeUpdateMany(
  (
    input: UpdateManyInputType<StakeholderDto, StakeholderDto>,
    context: GqlContext,
  ) => {
    input.update.updated_by = getUserName(context);
    return input;
  },
)
export class StakeholderUpdateDto {
  @Field()
  @IsOptional()
  @IsString()
  stakeholder_name?: string;

  @Field()
  @IsOptional()
  @IsString()
  business_unit?: string;
}

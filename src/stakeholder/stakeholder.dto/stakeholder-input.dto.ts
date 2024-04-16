import { Field, InputType } from '@nestjs/graphql';
import {
  BeforeCreateMany,
  BeforeCreateOne,
  CreateManyInputType,
  CreateOneInputType,
} from '@ptc-org/nestjs-query-graphql';
import { StakeholderDto } from './stakeholder.dto';
import { GqlContext } from 'src/auth.guard';
import { getUserName } from 'src/helpers';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('StakeholderInput')
@BeforeCreateOne(
  (input: CreateOneInputType<StakeholderDto>, context: GqlContext) => {
    input.input.created_by = getUserName(context);
    return input;
  },
)
@BeforeCreateMany(
  (input: CreateManyInputType<StakeholderDto>, context: GqlContext) => {
    const createdBy = getUserName(context);
    input.input = input.input.map((c) => ({ ...c, createdBy }));
    return input;
  },
)
export class StakeholderInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  stakeholder_name!: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  business_unit!: string;
}

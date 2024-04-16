import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('TagInput')
export class TagInputDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name!: string;
}

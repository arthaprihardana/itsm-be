import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { AuthGuard } from 'src/auth.guard';
import {
  StakeholderEntity,
  StakeholderEntitySchema,
} from './stakeholder.entity/stakeholder.entity';
import { StakeholderDto } from './stakeholder.dto/stakeholder.dto';
import { StakeholderInputDto } from './stakeholder.dto/stakeholder-input.dto';
import { StakeholderUpdateDto } from './stakeholder.dto/stakeholder-update.dto';

const guards = [AuthGuard];
@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: StakeholderEntity,
            name: StakeholderEntity.name,
            schema: StakeholderEntitySchema,
          },
        ]),
      ],
      resolvers: [
        {
          DTOClass: StakeholderDto,
          EntityClass: StakeholderEntity,
          CreateDTOClass: StakeholderInputDto,
          UpdateDTOClass: StakeholderUpdateDto,
          create: { guards },
          update: { guards },
          delete: { guards },
        },
      ],
    }),
  ],
})
export class StakeholderModule {}

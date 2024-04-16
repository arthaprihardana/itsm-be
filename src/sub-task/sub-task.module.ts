import { Module } from '@nestjs/common';
import {
  SubTaskEntity,
  SubTaskEntitySchema,
} from './sub-task.entity/sub-task.entity';
import { SubTaskDto } from './sub-task.dto/sub-task.dto';
import { SubtaskInputDto } from './sub-task.dto/subtask-input.dto';
import { SubtaskUpdateDto } from './sub-task.dto/subtask-update.dto';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: SubTaskEntity,
            name: SubTaskEntity.name,
            schema: SubTaskEntitySchema,
          },
        ]),
      ],
      resolvers: [
        {
          DTOClass: SubTaskDto,
          EntityClass: SubTaskEntity,
          CreateDTOClass: SubtaskInputDto,
          UpdateDTOClass: SubtaskUpdateDto,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class SubTaskModule {}

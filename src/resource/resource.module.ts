import { Module } from '@nestjs/common';
import {
  ResourceEntity,
  ResourceEntitySchema,
} from './resource.entity/resource.entity';
import { ResourceDto } from './resource.dto/resource.dto';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { ResourceInputDto } from './resource.dto/resource-input.dto';
import { ResourceUpdateDto } from './resource.dto/resource-update.dto';
import { AuthGuard } from 'src/auth.guard';

const guards = [AuthGuard];
@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: ResourceEntity,
            name: ResourceEntity.name,
            schema: ResourceEntitySchema,
          },
        ]),
      ],
      resolvers: [
        {
          DTOClass: ResourceDto,
          EntityClass: ResourceEntity,
          CreateDTOClass: ResourceInputDto,
          UpdateDTOClass: ResourceUpdateDto,
          // enableAggregate: true,
          create: { guards },
          update: { guards },
          delete: { guards },
        },
      ],
    }),
  ],
})
export class ResourcesModule {}

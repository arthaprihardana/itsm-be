import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { TagEntity, TagEntitySchema } from './tag.entity/tag.entity';
import { TagDto } from './tag.dto/tag.dto';
import { TagInputDto } from './tag.dto/tag-input.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: TagEntity,
            name: TagEntity.name,
            schema: TagEntitySchema,
          },
        ]),
      ],
      resolvers: [
        {
          DTOClass: TagDto,
          EntityClass: TagEntity,
          CreateDTOClass: TagInputDto,
          UpdateDTOClass: TagInputDto,
          enableAggregate: true,
        },
      ],
    }),
  ],
})
export class TagModule {}

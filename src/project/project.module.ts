import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { AuthGuard } from 'src/auth.guard';
import {
  ProjectEntity,
  ProjectEntitySchema,
} from './project.entity/project.entity';
import { ProjectDto } from './project.dto/project.dto';
import { ProjectInputDto } from './project.dto/project-input.dto';
import { ProjectUpdateDto } from './project.dto/project-update.dto';
import { ProjectAssembler } from './project.assembler/project.assembler';

const guards = [AuthGuard];
@Module({
  providers: [],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: ProjectEntity,
            name: ProjectEntity.name,
            schema: ProjectEntitySchema,
          },
        ]),
      ],
      assemblers: [ProjectAssembler],
      resolvers: [
        {
          DTOClass: ProjectDto,
          AssemblerClass: ProjectAssembler,
          CreateDTOClass: ProjectInputDto,
          UpdateDTOClass: ProjectUpdateDto,
          create: { guards },
          update: { guards },
          delete: { guards },
        },
      ],
    }),
  ],
})
export class ProjectModule {}

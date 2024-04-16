import { Resolver } from '@nestjs/graphql';
import { ProjectDto } from '../project.dto/project.dto';
import {
  InjectAssemblerQueryService,
  QueryService,
} from '@ptc-org/nestjs-query-core';
import { ProjectAssembler } from '../project.assembler/project.assembler';

@Resolver(() => ProjectDto)
export class ProjectResolver {
  constructor(
    @InjectAssemblerQueryService(ProjectAssembler)
    readonly service: QueryService<ProjectDto>,
  ) {}
}

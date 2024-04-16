import {
  Assembler,
  ClassTransformerAssembler,
} from '@ptc-org/nestjs-query-core';
import { ProjectDto } from '../project.dto/project.dto';
import { ProjectEntity } from '../project.entity/project.entity';

@Assembler(ProjectDto, ProjectEntity)
export class ProjectAssembler extends ClassTransformerAssembler<
  ProjectDto,
  ProjectEntity
> {
  convertToDTO(entity: ProjectEntity): ProjectDto {
    const dto = super.convertToDTO(entity);
    return dto;
  }
}

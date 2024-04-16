import {
  Assembler,
  ClassTransformerAssembler,
} from '@ptc-org/nestjs-query-core';
import { DepartmentDto } from '../department.dto/department.dto';
import { DepartmentEntity } from '../department.entity/department.entity';

@Assembler(DepartmentDto, DepartmentEntity)
export class DepartmentAssembler extends ClassTransformerAssembler<
  DepartmentDto,
  DepartmentEntity
> {
  convertToDTO(entity: DepartmentEntity): DepartmentDto {
    const dto = super.convertToDTO(entity);
    return dto;
  }
}

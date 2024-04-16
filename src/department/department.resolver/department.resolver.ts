import { Resolver } from '@nestjs/graphql';
import { DepartmentDto } from '../department.dto/department.dto';
import {
  InjectAssemblerQueryService,
  QueryService,
} from '@ptc-org/nestjs-query-core';
import { DepartmentAssembler } from '../department.assembler/department.assembler';

@Resolver(() => DepartmentDto)
export class DepartmentResolver {
  constructor(
    @InjectAssemblerQueryService(DepartmentAssembler)
    readonly service: QueryService<DepartmentDto>,
  ) {}
}

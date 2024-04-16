import { Module } from '@nestjs/common';
import {
  DepartmentEntity,
  DepartmentEntitySchema,
} from './department.entity/department.entity';
import { DepartmentDto } from './department.dto/department.dto';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { DepartmentResolver } from './department.resolver/department.resolver';
import { DepartmentAssembler } from './department.assembler/department.assembler';
import { DepartmentInputDto } from './department.dto/department-input.dto';
import { DepartmentUpdateDto } from './department.dto/department-update.dto';
import { AuthGuard } from 'src/auth.guard';

const guards = [AuthGuard];
@Module({
  providers: [DepartmentResolver],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: DepartmentEntity,
            name: DepartmentEntity.name,
            schema: DepartmentEntitySchema,
          },
        ]),
      ],
      assemblers: [DepartmentAssembler],
      resolvers: [
        {
          DTOClass: DepartmentDto,
          AssemblerClass: DepartmentAssembler,
          CreateDTOClass: DepartmentInputDto,
          UpdateDTOClass: DepartmentUpdateDto,
          // enableAggregate: true,
          // aggregate: { guards },
          create: { guards },
          update: { guards },
          delete: { guards },
        },
      ],
    }),
  ],
})
export class DepartmentModule {}

import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { RoleEntity, RoleEntitySchema } from './role.entity/role.entity';
import { RoleDto } from './role.dto/role.dto';
import { RoleInputDto } from './role.dto/role-input.dto';
import { RoleUpdateDto } from './role.dto/role-update.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: RoleEntity,
            name: RoleEntity.name,
            schema: RoleEntitySchema,
          },
        ]),
      ],
      resolvers: [
        {
          DTOClass: RoleDto,
          EntityClass: RoleEntity,
          CreateDTOClass: RoleInputDto,
          UpdateDTOClass: RoleUpdateDto,
          // enableAggregate: true,
        },
      ],
    }),
  ],
})
export class RoleModule {}

import { Module } from '@nestjs/common';
import {
  TodoItemEntity,
  TodoItemEntitySchema,
} from './todo-item.entity/todo-item.entity';
import { TodoItemDto } from './todo-item.dto/todo-item.dto';
import { TodoItemResolverResolver } from './todo-item.resolver/todo-item.resolver.resolver';
import { TodoItemAssembler } from './todo-item.assembler/todo-item.assembler';
import { TodoItemInputDto } from './todo-item.dto/todo-item-input.dto';
import { TodoItemUpdateDto } from './todo-item.dto/todo-item-update.dto';
import { AuthGuard } from 'src/auth.guard';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';

const guards = [AuthGuard];
@Module({
  providers: [TodoItemResolverResolver],
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: TodoItemEntity,
            name: TodoItemEntity.name,
            schema: TodoItemEntitySchema,
          },
        ]),
      ],
      assemblers: [TodoItemAssembler],
      resolvers: [
        {
          DTOClass: TodoItemDto,
          AssemblerClass: TodoItemAssembler,
          CreateDTOClass: TodoItemInputDto,
          UpdateDTOClass: TodoItemUpdateDto,
          enableAggregate: true,
          aggregate: { guards },
          create: { guards },
          update: { guards },
          delete: { guards },
        },
      ],
    }),
  ],
})
export class TodoItemModule {}

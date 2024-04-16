import { Args, Query, Resolver } from '@nestjs/graphql';
import { TodoItemDto } from '../todo-item.dto/todo-item.dto';
import {
  Filter,
  InjectAssemblerQueryService,
  QueryService,
} from '@ptc-org/nestjs-query-core';
import { TodoItemAssembler } from '../todo-item.assembler/todo-item.assembler';
import { TodoItemConnection, TodoItemQuery } from '../types';
import { ConnectionType } from '@ptc-org/nestjs-query-graphql';

@Resolver(() => TodoItemDto)
export class TodoItemResolverResolver {
  constructor(
    @InjectAssemblerQueryService(TodoItemAssembler)
    readonly service: QueryService<TodoItemDto>,
  ) {}

  @Query(() => TodoItemConnection)
  completedTodoItems(
    @Args() query: TodoItemQuery,
  ): Promise<ConnectionType<TodoItemDto>> {
    // add the completed filter the user provided filter
    const filter: Filter<TodoItemDto> = {
      ...query.filter,
      ...{ completed: { is: true } },
    };

    return TodoItemConnection.createFromPromise((q) => this.service.query(q), {
      ...query,
      ...{ filter },
    });
  }

  // Set the return type to the TodoItemConnection
  @Query(() => TodoItemConnection)
  uncompletedTodoItems(
    @Args() query: TodoItemQuery,
  ): Promise<ConnectionType<TodoItemDto>> {
    // add the completed filter the user provided filter
    const filter: Filter<TodoItemDto> = {
      ...query.filter,
      ...{ completed: { is: false } },
    };

    return TodoItemConnection.createFromPromise((q) => this.service.query(q), {
      ...query,
      ...{ filter },
    });
  }
}

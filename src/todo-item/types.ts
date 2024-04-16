import { ArgsType } from '@nestjs/graphql';
import { TodoItemDto } from './todo-item.dto/todo-item.dto';
import { QueryArgsType } from '@ptc-org/nestjs-query-graphql';
import { DepartmentDto } from 'src/department/department.dto/department.dto';

@ArgsType()
export class TodoItemQuery extends QueryArgsType(TodoItemDto) {}
export class DepartmentQuery extends QueryArgsType(DepartmentDto) {}

export const TodoItemConnection = TodoItemQuery.ConnectionType;
export const DepartmentConnection = DepartmentQuery.ConnectionType;

import {
  Assembler,
  ClassTransformerAssembler,
} from '@ptc-org/nestjs-query-core';
import { TodoItemDto } from '../todo-item.dto/todo-item.dto';
import { TodoItemEntity } from '../todo-item.entity/todo-item.entity';

@Assembler(TodoItemDto, TodoItemEntity)
export class TodoItemAssembler extends ClassTransformerAssembler<
  TodoItemDto,
  TodoItemEntity
> {
  convertToDTO(entity: TodoItemEntity): TodoItemDto {
    const dto = super.convertToDTO(entity);
    dto.age = Date.now() - entity.createdAt.getMilliseconds();
    return dto;
  }
}

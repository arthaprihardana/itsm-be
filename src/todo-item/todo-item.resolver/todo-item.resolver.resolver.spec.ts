import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemResolverResolver } from './todo-item.resolver.resolver';

describe('TodoItemResolverResolver', () => {
  let resolver: TodoItemResolverResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoItemResolverResolver],
    }).compile();

    resolver = module.get<TodoItemResolverResolver>(TodoItemResolverResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

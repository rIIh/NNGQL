import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoEntity } from './entity/todo.entity';
import { Field, ID, InputType, Int } from 'type-graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@InputType()
class TodoConstructor {
  @Field(() => String)
  title: string;
}

@Resolver()
export class TodoResolver {
  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {}

  @Query(() => [TodoEntity])
  async todos() {
    return await this.todoRepository.find({});
  }

  @Mutation(() => TodoEntity)
  async createTodo(@Args('todo') obg: TodoConstructor) {
    return await this.todoRepository.create(obg).save();
  }

  @Mutation(() => Boolean)
  async switchTodoState(@Args({ name: 'id', type: () => ID}) id: number) {
    const todos: TodoEntity[] = await this.todoRepository.find({id});
    todos.forEach(todo => {
      todo.completed = !todo.completed;
      todo.save();
    });
    return true;
  }

  @Mutation(() => Boolean)
  async remove(@Args({ name: 'id', type: () => ID }) id: number) {
    const result = await this.todoRepository.delete({id});
    return result !== undefined;
  }
}

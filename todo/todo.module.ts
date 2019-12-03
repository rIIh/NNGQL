import { Module } from '@nestjs/common';
import { TodoResolver } from './todo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TodoEntity,
    ]),
  ],
  providers: [TodoResolver],
})
export class TodoModule {

}

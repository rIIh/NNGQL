import {Arg, Field, ID, InputType, Mutation, Query, Resolver} from "@hoalongntc/typegraphql";
import {Todo} from "../entities/todo";

@InputType()
class TodoConstructor {
    @Field()
    title: string;
}

@Resolver(Todo)
export class TodoResolver {
    @Query(returns => [Todo])
    async todos() {
        return [];
        // return await Todo.find();
    }

    // @Mutation(returns => Todo)
    // new(@Arg('todo') todo: TodoConstructor) {
    //     return {}
    //     // return Todo.create(todo);
    // }
    //
    // @Mutation(returns => Boolean)
    // async remove(@Arg('id', returns => ID) id: number) {
    //     return await Todo.delete(id);
    // }
}

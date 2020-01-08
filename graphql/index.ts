import {buildSchema} from "@hoalongntc/typegraphql";
import {TodoResolver} from "./resolvers/todo_resolver";

export function createGraphQLSchema() {
    return buildSchema({
        resolvers: [
            TodoResolver
        ]})
}

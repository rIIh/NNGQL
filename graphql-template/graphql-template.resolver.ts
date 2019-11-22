import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class GraphqlTemplateResolver {
  @Query(() => String)
  hello() {
    return 'Hello world';
  }
}

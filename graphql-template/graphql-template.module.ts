import { Module } from '@nestjs/common';
import { GraphqlTemplateResolver } from './graphql-template.resolver';

@Module({
  providers: [GraphqlTemplateResolver],
})
export class GraphqlTemplateModule {

}

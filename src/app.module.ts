import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NextMiddleware, NextModule } from '@nestpress/next/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { getConnectionOptions } from 'typeorm';
import { GraphqlTemplateModule } from '../graphql-template/graphql-template.module';

@Module({
  imports: [
    NextModule,
    TypeOrmModule.forRoot(),
    GraphqlTemplateModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // handle scripts
    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: '_next*',
        method: RequestMethod.GET,
      });

    // handle other assets
    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: 'images/*',
        method: RequestMethod.GET,
      });

    consumer
      .apply(NextMiddleware)
      .forRoutes({
        path: 'favicon.ico',
        method: RequestMethod.GET,
      });

  }

}

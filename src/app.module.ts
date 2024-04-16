import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TodoItemModule } from './todo-item/todo-item.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
// import { SubTaskModule } from './sub-task/sub-task.module';
import { GqlContext } from './auth.guard';
// import { TagModule } from './tag/tag.module';
import { formatGraphqlError } from './helpers/graphql.helpers';
import { DepartmentModule } from './department/department.module';
import { ResourcesModule } from './resource/resource.module';
import { RoleModule } from './role/role.module';
import { ProjectModule } from './project/project.module';
import { ProductModule } from './product/product.module';
import { StakeholderModule } from './stakeholder/stakeholder.module';

// const { uri, ...options } = mongooseConfig('mongoose');
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb://root:12345@localhost:27017/itsm?retryWrites=false&loadBalanced=false&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256',
      {},
    ),
    // MongooseModule.forRoot(uri, options),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // autoSchemaFile: true,
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      context: ({
        req,
      }: {
        req: { headers: Record<string, string> };
      }): GqlContext => ({ request: req }),
      formatError: formatGraphqlError,
    }),
    // TodoItemModule,
    // SubTaskModule,
    // TagModule,
    DepartmentModule,
    ResourcesModule,
    RoleModule,
    ProjectModule,
    ProductModule,
    StakeholderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

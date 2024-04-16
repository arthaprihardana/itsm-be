import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import {
  ProductEntity,
  ProductEntitySchema,
} from './product.entity/product.entity';
import { ProductDto } from './product.dto/product.dto';
import { ProductInputDto } from './product.dto/product-input.dto';
import { ProductUpdateDto } from './product.dto/product-update.dto';
import { AuthGuard } from 'src/auth.guard';

const guards = [AuthGuard];
@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: ProductEntity,
            name: ProductEntity.name,
            schema: ProductEntitySchema,
          },
        ]),
      ],
      resolvers: [
        {
          DTOClass: ProductDto,
          EntityClass: ProductEntity,
          CreateDTOClass: ProductInputDto,
          UpdateDTOClass: ProductUpdateDto,
          create: { guards },
          update: { guards },
          delete: { guards },
        },
      ],
    }),
  ],
})
export class ProductModule {}

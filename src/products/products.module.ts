import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { Transport} from '@nestjs/microservices';
import { join } from 'path';
import { ProductsController } from "./products.controller";
import { SequelizeModule} from '@nestjs/sequelize';
import { ProductModel } from "./product.model";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PRODUCTS_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'products',
                    protoPath: join(__dirname, '../../src/products/products.proto'), // Exit from dist dir
                },
            },
        ]),
        SequelizeModule.forFeature([ProductModel])
    ],
    controllers: [ ProductsController],
})
export class ProductsModule {}
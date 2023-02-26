import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { grpcClientOptions } from "src/grpc-client.options";
import { ClientOptions, Transport} from '@nestjs/microservices';
import { join } from 'path';
import { ProductsController } from "./products.controller";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'PRODUCTS_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'products',
                    protoPath: join(__dirname, 'products.proto'),
                },
            },
        ]),
    ],
    controllers: [ ProductsController],
})
export class ProductsModule {}
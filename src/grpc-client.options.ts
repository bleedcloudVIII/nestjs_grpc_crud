import { ClientOptions, Transport} from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        package: 'products',
        protoPath: join(__dirname, '../src/products/products.proto'), // Exit from dist dir
    },
};
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { grpcClientOptions } from './grpc-client.options';


async function bootstrap() {
  //grpc:
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'products',
  //     protoPath: join(__dirname, './products/products.proto'),
  //   }
  // });
  // grpc + http:
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();

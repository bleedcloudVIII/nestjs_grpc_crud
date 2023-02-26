import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModel } from './products/product.model';

@Module({
  imports: [ 
    ProductsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'grpctest',
      models: [ProductModel],
      autoLoadModels: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Controller, OnModuleInit, Inject, Get, Post, Delete, Put, Param} from '@nestjs/common'
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable} from 'rxjs'
import { ProductById } from './interfaces/product-by-id.interface'
import { Product } from './interfaces/product.interface'


interface ProductsService {
    FindOne(data: ProductById): Observable<Product>;
    // FindAll(upstream: Observable<ProductById>): Observable<Product>;
    // Delete(data: ProductById);
    // Update(data: Product): Observable<Product>;
    // Create(data: Product): Observable<Product>;
}

@Controller('products')
export class ProductsController implements OnModuleInit {
    private productsService: ProductsService;

    constructor (@Inject('PRODUCTS_PACKAGE') private readonly client: ClientGrpc) {}

    onModuleInit() {
        this.productsService = this.client.getService<ProductsService>('ProductsService');
    }

    @Get(':id')
    getById(@Param('id') id: string): Observable<Product> {
        return this.productsService.FindOne({id: +id});
    }

    @GrpcMethod('ProductsService')
    findOne(data: ProductById): Product {
        // Change!!
        let Product = {"id": 1, "name": 'sdad', "cost": 22};
        return Product;
    }

}
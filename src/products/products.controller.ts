import { Controller, OnModuleInit, Inject, Get, Post, Delete, Put, Param} from '@nestjs/common'
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable} from 'rxjs'
import { ProductById } from './interfaces/product-by-id.interface'
import { Product } from './interfaces/product.interface'
import { InjectModel} from '@nestjs/sequelize';
import { ProductModel } from './product.model';
import { toArray} from 'rxjs/operators'

interface ProductsService {
    FindOne(data: ProductById): Observable<Product>;
    FindAll();
    // Delete(data: ProductById);
    // Update(data: Product): Observable<Product>;
    // Create(data: Product): Observable<Product>;
}

@Controller('products')
export class ProductsController implements OnModuleInit {
    private productsService: ProductsService;

    constructor (@Inject('PRODUCTS_PACKAGE') private readonly client: ClientGrpc,
    @InjectModel(ProductModel) private productsRepository: typeof ProductModel) {}

    onModuleInit() {
        this.productsService = this.client.getService<ProductsService>('ProductsService');
    }

    @Get(':id')
    getById(@Param('id') id: number): Observable<Product> {
        return this.productsService.FindOne({id: id});
    }

    @GrpcMethod('ProductsService')
    async FindOne(data: ProductById): Promise<Product> {
        const user: Product = await this.productsRepository.findOne({where: {id: data.id}});
        return user;
    }

    @Get()
    getAll(): Observable<Product[]> {
        return this.productsService.FindAll();
    }   

    @GrpcMethod('ProductsService')
    async FindAll(): Promise<Product[]> {
        const products: Product[] = await this.productsRepository.findAll();
        return products;
    }
}
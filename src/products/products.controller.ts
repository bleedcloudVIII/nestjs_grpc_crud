import { Controller, OnModuleInit, Inject, Get, Post, Delete, Put, Param, Body, HttpStatus} from '@nestjs/common'
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable} from 'rxjs'
import { ProductById } from './interfaces/product-by-id.interface'
import { Product } from './interfaces/product.interface'
import { InjectModel} from '@nestjs/sequelize';
import { ProductModel } from './product.model';
import { ProductWithoutId } from './interfaces/product-without-id.interface';
import { AllProducts } from './interfaces/all-products.interface';

interface ProductsService {
    FindOne(data: ProductById): Observable<Product>;
    FindAll({}): Observable<AllProducts>;
    Delete(data: ProductById);
    Update(data: Product): Observable<Product>;
    Create(data: ProductWithoutId): Observable<Product>;
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

    @GrpcMethod('ProductsService', 'FindOne')
    async FindOne(data: ProductById): Promise<Product | {}> {
        const user: Product = await this.productsRepository.findOne({where: {id: data.id}});
        if (user == null) {
            return {};
        }
        else {
            return user;
        }
    }

    @Get()
    getAll(): Observable<AllProducts> {
        return this.productsService.FindAll({});
    }   

    @GrpcMethod('ProductsService', 'FindAll')
    async FindAll(): Promise<AllProducts> {
        const products: Product[] = await this.productsRepository.findAll();
        return { products };
    }

    @Post()
    create(@Body() data: ProductWithoutId): Observable<Product> {
        return this.productsService.Create(data);
    }

    @GrpcMethod('ProductsService', 'Create')
    async Create(data: ProductWithoutId): Promise<Product> {
        const user: Product = await this.productsRepository.create(data);
        return user;
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productsService.Delete({id: id});
    }

    @GrpcMethod('ProductsService', 'Delete')
    async Delete(data: ProductById) {
        await this.productsRepository.destroy({where: {id: data.id}});
        return HttpStatus.OK;
    }

    @Put()
    update(@Body() data: Product): Observable<Product> {
        return this.productsService.Update(data);
    }

    @GrpcMethod('ProductsService', 'Update')
    async Update(data: Product): Promise<Product | {}> {
        const user = await this.productsRepository.findOne({where: {id: data.id}});
        if (user == null) {
            return {};
        }
        else {
            await this.productsRepository.update({...data}, {where: {id: data.id}});
            const newUser = await this.productsRepository.findOne({where: {id: data.id}});
            return newUser;
        }
    }
}
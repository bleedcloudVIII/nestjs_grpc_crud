import { Column, Model, Table, DataType} from 'sequelize-typescript';

interface ProductCreationAttrs {
    name: string;
    cost: number;
}

@Table({tableName: 'products', createdAt:false, updatedAt: false})
export class ProductModel extends Model<ProductModel, ProductCreationAttrs> {
    // Change proto file
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.INTEGER})
    cost: number;
}
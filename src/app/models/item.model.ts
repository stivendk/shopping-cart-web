export interface Item {
    id: number;
    name: string;
    price: number;
    date: Date;
    stock: number;
    type: ItemTypeEnum;
    status: ItemStatusEnum;
    urlImage: string;
}

export enum ItemStatusEnum {
    AVAILABLE = 'AVAILABLE',
    UNAVAILABLE = 'UNAVAILABLE',
}

export enum ItemTypeEnum {
    PRODUCT = 'PRODUCT',
    EVENT = 'EVENT',
}
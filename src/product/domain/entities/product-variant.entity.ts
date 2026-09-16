import { NegativeStockError } from "../errors/negative-stock.error.js";

export interface ProductVariantProps {
  id: string;
  productId: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
}


export class ProductVariant { 
  constructor(private props: ProductVariantProps) { 
    this.validateStock(this.props.stock);

  }

  get size(): string {
    return this.props.size;
  }

  get color(): string {
    return this.props.color;
  }

  get sku(): string {
    return this.props.sku;
  }
  get stock(): number {
    return this.props.stock;
  }

  get id(): string {
    return this.props.id;
  }

  validateStock(stock: number) {
    if(stock < 0) {
      throw new NegativeStockError(stock);
    }

  }

  decreaseStock(quantity: number): void {
    this.validateStock(this.props.stock - quantity);
    this.props.stock -= quantity;
  }

  increaseStock(quantity: number): void {
    this.props.stock += quantity;
  }
}

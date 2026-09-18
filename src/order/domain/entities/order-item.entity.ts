import { InvalidQuantityError } from '../errors/invalid-quantity.error.js';
import { NegativeUnitPriceError } from '../errors/negative-unit-price.error.js';

export interface OrderItemProps {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  productNameSnapshot: string;
}

export class OrderItem {
  constructor(private props: OrderItemProps) {
    if (props.quantity <= 0) {
      throw new InvalidQuantityError(props.quantity);
    }

    if (props.unitPrice < 0) {
      throw new NegativeUnitPriceError(props.unitPrice);
    }
  }

  get id(): string {
    return this.props.id;
  }

  get orderId(): string {
    return this.props.orderId;
  }

  get variantId(): string {
    return this.props.variantId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get unitPrice(): number {
    return this.props.unitPrice;
  }

  get productNameSnapshot(): string {
    return this.props.productNameSnapshot;
  }

  get subtotal(): number {
    return this.props.quantity * this.props.unitPrice;
  }

  toJSON() {
    return { ...this.props, subtotal: this.subtotal };
  }
}

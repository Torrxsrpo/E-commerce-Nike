import { InvalidQuantityError } from '../errors/invalid-quantity.error.js';

export interface CartItemProps {
  id: string;
  cartId: string;
  variantId: string;
  quantity: number;
}

export class CartItem {
  constructor(private props: CartItemProps) {
    this.validateQuantity(props.quantity);
  }

  get id(): string {
    return this.props.id;
  }

  get cartId(): string {
    return this.props.cartId;
  }

  get variantId(): string {
    return this.props.variantId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  increaseQuantity(amount: number): void {
    this.validateQuantity(this.props.quantity + amount);
    this.props.quantity += amount;
  }

  changeQuantity(newQuantity: number): void {
    this.validateQuantity(newQuantity);
    this.props.quantity = newQuantity;
  }

  private validateQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new InvalidQuantityError(quantity);
    }
  }
}

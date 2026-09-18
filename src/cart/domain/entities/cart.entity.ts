import { CartItem } from './cart-item.entity.js';

export interface CartProps {
  id: string;
  createdAt: Date;
  items?: CartItem[];
}

export class Cart {
  private readonly _items: CartItem[] = [];

  constructor(private props: CartProps) {
    for (const item of props.items ?? []) {
      this._items.push(item);
    }
  }

  get id(): string {
    return this.props.id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get items(): readonly CartItem[] {
    return this._items;
  }

  addItem(item: CartItem): void {
    const existingItem = this._items.find((existing) => existing.variantId === item.variantId);

    if (existingItem) {
      existingItem.increaseQuantity(item.quantity);
      return;
    }

    this._items.push(item);
  }

  removeItem(cartItemId: string): void {
    const index = this._items.findIndex((item) => item.id === cartItemId);

    if (index !== -1) {
      this._items.splice(index, 1);
    }
  }

  toJSON() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      items: this._items,
    };
  }
}

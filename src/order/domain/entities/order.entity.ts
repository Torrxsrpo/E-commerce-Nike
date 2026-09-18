import { EmptyOrderError } from '../errors/empty-order.error.js';
import { InvalidOrderStatusTransitionError } from '../errors/invalid-order-status-transition.error.js';
import { OrderItem } from './order-item.entity.js';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'DELIVERED';

const TERMINAL_STATUSES: OrderStatus[] = ['CANCELLED', 'DELIVERED'];

export interface OrderProps {
  id: string;
  contactName: string;
  contactEmail: string;
  status: OrderStatus;
  createdAt: Date;
  items?: OrderItem[];
}

export class Order {
  private readonly _items: OrderItem[] = [];

  constructor(private props: OrderProps) {
    for (const item of props.items ?? []) {
      this._items.push(item);
    }
  }

  get id(): string {
    return this.props.id;
  }

  get contactName(): string {
    return this.props.contactName;
  }

  get contactEmail(): string {
    return this.props.contactEmail;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get items(): readonly OrderItem[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  addItem(item: OrderItem): void {
    this._items.push(item);
  }

  changeStatus(newStatus: OrderStatus): void {
    if (TERMINAL_STATUSES.includes(this.props.status) || this.props.status === newStatus) {
      throw new InvalidOrderStatusTransitionError(this.props.status, newStatus);
    }

    if (newStatus === 'CONFIRMED') {
      if (this.props.status !== 'PENDING') {
        throw new InvalidOrderStatusTransitionError(this.props.status, newStatus);
      }

      if (this._items.length === 0) {
        throw new EmptyOrderError();
      }
    }

    this.props.status = newStatus;
  }

  toJSON() {
    return {
      id: this.id,
      contactName: this.contactName,
      contactEmail: this.contactEmail,
      status: this.status,
      createdAt: this.createdAt,
      items: this._items,
      total: this.total,
    };
  }
}

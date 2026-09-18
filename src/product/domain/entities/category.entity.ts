export interface CategoryProps {
  id: string;
  name: string;
  slug: string;
}

export class Category {
  constructor(private props: CategoryProps) {}

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  toJSON() {
    return { ...this.props };
  }
}

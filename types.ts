
export enum Category {
  HOODIE = 'Hoodie',
  TSHIRT = 'T-shirt',
  PANTS = 'Pants'
}

export enum Status {
  IN_STOCK = 'In Stock',
  BOOKED = 'Booked',
  NOT_DELIVERED = 'Not Delivered',
  DELIVERED = 'Delivered',
  OUT_OF_STOCK = 'Out of Stock'
}

export interface Product {
  id: string;
  itemName: string;
  category: Category;
  investmentCost: number;
  sellingPrice: number;
  stockQuantity: number;
  status: Status;
  isTrash: boolean;
  createdAt: number;
}

export interface DashboardStats {
  activeStockValue: number;
  realizedProfit: number;
  projectedCash: number;
  efficiency: {
    category: Category;
    count: number;
  }[];
}

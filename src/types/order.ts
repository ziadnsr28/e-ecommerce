export interface IOrderItemProduct {
  _id: string;
  title: string;
  imageCover: string;
  category?: {
    _id?: string;
    name?: string;
    slug?: string;
  };
  brand?: {
    _id?: string;
    name?: string;
  };
  ratingsAverage?: number;
  id?: string;
}

export interface IOrderItem {
  _id: string;
  count: number;
  price: number;
  product: IOrderItemProduct;
}

export interface IShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface IOrderUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IOrder {
  _id: string;
  id: number;
  shippingAddress?: IShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card" | string;
  isPaid: boolean;
  isDelivered: boolean;
  user: IOrderUser;
  cartItems: IOrderItem[];
  createdAt: string;
  updatedAt: string;
}

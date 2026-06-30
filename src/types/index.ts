export type ApiPostMethods = "POST" | "PUT" | "DELETE";

type TPayment = "online" | "cash"
type Nullish<T> = T | null;
type TPrice = Nullish<number>;
export type TFoundProduct = Nullish<IProduct>;
export type TBuyerDataValidationObject = Partial<Record<keyof IBuyer, string>> 

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TPrice;
}

export interface IBuyer {
  payment: TPayment | null;
  email: string;
  phone: string;
  address: string;
}

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

export interface IOrder extends IBuyer {
  total: number;
  items: IProduct["id"][];
}

// API TYPES
export interface IProductListResponse {
  total: number;
  items: IProduct[];
}

export interface IProductResponse {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TPrice;
}

export interface IOrderResponse {
  id: string;
  total: number;
}

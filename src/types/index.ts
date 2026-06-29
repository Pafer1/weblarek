export type ApiPostMethods = "POST" | "PUT" | "DELETE";

type TPayment = "online" | "type2" | "";
type Nullish<T> = T | null;
type TPrice = Nullish<number>;
export type TFoundProduct = Nullish<IProduct>;

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TPrice;
}

export interface IBuyer {
  payment: TPayment;
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
  items: IProduct["id"];
}

// API TYPES
export interface IProductListResponce {
  total: number;
  items: IProduct[];
}

export interface IProductResponce {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: TPrice;
}

export interface IOrderResponce {
  id: string;
  total: number;
}

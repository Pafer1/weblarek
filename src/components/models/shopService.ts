import {
  IApi,
  IOrder,
  IOrderResponse,
  IProduct,
  IProductListResponse,
  IProductResponse,
} from "../../types";

export class ShopService {
  private api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }
  async getProducts() {
    return await this.api.get<IProductListResponse>("/product/");
  }
  async getProduct(id: IProduct["id"]) {
    return await this.api.get<IProductResponse>(`/product/${id}`);
  }
  async postOrder(data: IOrder) {
    return await this.api.post<IOrderResponse>("/order/", data);
  }
}

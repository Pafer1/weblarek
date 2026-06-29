import {
  IOrder,
  IOrderResponce,
  IProduct,
  IProductListResponce,
  IProductResponce,
} from "../../types";
import { Api } from "../base/Api";

export class ShopService {
  private api: Api;
  constructor(api: Api) {
    this.api = api;
  }
  async getProducts() {
    const res = await this.api.get<IProductListResponce>("/product/");
    return res;
  }
  async getProduct(id: IProduct["id"]) {
    const res = await this.api.get<IProductResponce>(`/product/${id}`);
    return res;
  }
  async postOrder(data: IOrder) {
    const res = await this.api.post<IOrderResponce>("/order/", data);
    return res;
  }
}

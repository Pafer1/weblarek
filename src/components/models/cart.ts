// корзина:
// хранит массив товаров, выбранных покупателем для покупки.
// методы:
// получение массива товаров, которые находятся в корзине;
// добавление товара, который был получен в параметре, в массив корзины;
// удаление товара, полученного в параметре из массива корзины;
// очистка корзины;
// получение стоимости всех товаров в корзине;
// получение количества товаров в корзине;
// проверка наличия товара в корзине по его id, полученного в параметр метода.

import { IProduct } from "../../types";

interface ICart {
  addProduct(product: IProduct): void;
  deleteProduct(product: IProduct): void;
  clearCart(): void;
  getCartPrice(): number;
  getProductsCount(): number;
  isProductInCart(id: IProduct["id"]): boolean;
}

export class Cart implements ICart {
  private cartList: IProduct[] = [];

  get cart(): IProduct[] {
    return this.cartList;
  }
  addProduct(product: IProduct) {
    this.cartList.push(product);
  }
  deleteProduct(product: IProduct) {
    this.cartList = this.cartList.filter((el) => el.id !== product.id);
  }
  clearCart() {
    this.cartList = [];
  }

  getCartPrice() {
    return this.cartList.reduce((acc, el) => acc + (el.price ?? 0), 0);
  }

  getProductsCount() {
    return this.cartList.length;
  }
  isProductInCart(id: IProduct["id"]) {
    return this.cartList.some((el) => el.id === id);
  }
}

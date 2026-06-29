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
  cartPrice(): number;
  quantityProductsInCart(): number;
  isProductInCart(id: IProduct["id"]): boolean;
}

export class Cart implements ICart {
  private cartList: IProduct[] = [];

  //   constructor(items: IProduct[]) {
  //     this.catalogItems = items;
  //   }
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

  cartPrice() {
    const price: number = this.cartList.reduce(
      (acc: number, el: IProduct): number => {
        if (el.price) {
          return acc + el.price;
        } else {
          return acc;
        }
      },
      0,
    );
    return price;
  }

  quantityProductsInCart() {
    return this.cartList.length;
  }
  isProductInCart(id: IProduct["id"]) {
    return !!this.cartList.find((el) => el.id === id);
  }
}

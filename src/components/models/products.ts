// каталог товаров:
// хранит массив всех товаров;
// хранит товар, выбранный для подробного отображения;
// содержит методы:
// сохранение массива товаров полученного в параметрах метода;
// получение массива товаров из модели;
// получение одного товара по его id;
// сохранение товара для подробного отображения;
// получение товара для подробного отображения.

import { IProduct, TFoundProduct } from "../../types";
interface IProductList {
  getItemById(id: IProduct["id"]): TFoundProduct;
}

export class ProductList implements IProductList {
  private catalogItems: IProduct[] = [];
  private currentItem: IProduct | null = null;
  
  get items(): IProduct[] {
    return this.catalogItems;
  }
  set items(items: IProduct[]) {
    this.catalogItems = items;
  }

  get item(): TFoundProduct {
    return this.currentItem;
  }
  set item(item: TFoundProduct) {
    this.currentItem = item;
  }

  getItemById(id: IProduct["id"]): TFoundProduct {
    const item = this.catalogItems.find((item) => item.id === id);
    return item || null;
  }
}

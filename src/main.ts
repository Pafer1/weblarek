import { Api } from "./components/base/Api";
import { Buyer } from "./components/models/buyer";
import { Cart } from "./components/models/cart";
import { ProductList } from "./components/models/products";
import { ShopService } from "./components/models/shopService";
import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { apiProducts } from "./utils/data";

const api = new Api(API_URL);
const shopService = new ShopService(api);
const productsModel = new ProductList();
const cartModel = new Cart();
const buyerModel = new Buyer();

console.group("Тесты моделей");
console.log("Начальные товары из productsModel", productsModel.items);

// Тестирование ProductList
productsModel.items = apiProducts.items;
console.log("Сохранённые товары из тестовых данных", productsModel.items);
productsModel.item = apiProducts.items[0];
console.log("Выбранный товар", productsModel.item);
console.log(
  "Найден товар по id",
  productsModel.getItemById(apiProducts.items[0].id),
);

// Тестирование Cart
cartModel.addProduct(apiProducts.items[0]);
cartModel.addProduct(apiProducts.items[1]);
console.log("Товары в корзине после добавления", cartModel.cart);
console.log(
  "Первый товар в корзине присутствует",
  cartModel.isProductInCart(apiProducts.items[0].id),
);
console.log("Общая стоимость корзины", cartModel.getCartPrice());
console.log("Количество товаров в корзине", cartModel.getProductsCount());
cartModel.deleteProduct(apiProducts.items[0]);
console.log("Товары в корзине после удаления первого товара", cartModel.cart);
cartModel.clearCart();
console.log("Корзина после очистки", cartModel.cart);

// Тестирование Buyer
console.log("Попробуем получить данные покупателя до добавления", buyerModel.getBuyerData());
console.log("Зададим начальные данные покупателя", buyerModel.editBuyer({
  payment: "online",
  email: "test@test.ru",
  phone: "+71234567890",
  address: "Spb Vosstania 1",
}))
console.log("Начальные данные покупателя", buyerModel.getBuyerData());
console.log("Начальная валидация покупателя", buyerModel.validateBuyerData());
buyerModel.editBuyer({ address: "Moscow, Red Square 1" });
console.log(
  "Данные покупателя после сохранения адреса",
  buyerModel.getBuyerData(),
);
buyerModel.editBuyer({ phone: "+79998887766" });
console.log(
  "Данные покупателя после сохранения телефона",
  buyerModel.getBuyerData(),
);
console.log(
  "Валидация покупателя после изменений",
  buyerModel.validateBuyerData(),
);
buyerModel.clearBuyerData();
console.log("Данные покупателя после очистки", buyerModel.getBuyerData());
console.log(
  "Валидация покупателя после очистки",
  buyerModel.validateBuyerData(),
);
console.groupEnd();

// Запрос каталога с сервера и сохранение его в модели
try {
  const serverProducts = await shopService.getProducts();
  console.log("Ответ сервера с товарами", serverProducts);
  productsModel.items = serverProducts.items;
} catch (err) {
  console.error(err)
}

console.log(
  "Товары, сохранённые в productsModel из сервера",
  productsModel.items,
);
console.log("Каталог товаров через геттер productsModel", productsModel.items);
console.log(
  "Первый товар из сохраненного каталога",
  productsModel.getItemById(productsModel.items[0]?.id ?? ""),
);

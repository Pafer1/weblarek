// покупатель:
// хранит следующие данные:
// вид оплаты;
// адреc;
// телефон;
// email.
// методы:
// сохранение данных в модели. Один общий метод или отдельные методы для каждого поля. Важно учесть, что должна быть реализована возможность сохранить только одно значение, например, только адрес или только телефон, не удалив при этом значения других полей, которые уже могут храниться в классе;
// получение всех данных покупателя;
// очистка данных покупателя;
// валидация данных. Обратите внимание, что правила валидации описаны в функциональных требованиях.
// Поле является валидным, если оно не пустое.
// Метод валидации должен давать возможность определить не только валидность каждого отдельного поля, но и предоставлять
// информацию об ошибке, связанной с проверкой конкретного значения.

import { IBuyer, TBuyerDataValidationObject } from "../../types";

interface IBuyerClass {
  editBuyer({ payment, address, phone, email }: Partial<IBuyer>): void;
  getBuyerData(): IBuyer;
  clearBuyerData(): void;
  validateBuyerData(): Partial<Record<keyof IBuyer, string>>;
}

export class Buyer implements IBuyerClass {
  private EMPTY_DATA_VALIDATION_ERRORS = {
    payment: "Не выбран вид оплаты",
    address: "Укажите адрес",
    phone: "Укажите телефон",
    email: "Укажите электронную почту",
  };

  private buyerData: IBuyer = {
    payment: null,
    address: '',
    phone: '',
    email: '',
  }

  editBuyer({ payment, address, phone, email }: Partial<IBuyer>) {
    if (payment) this.buyerData.payment = payment;
    if (address) this.buyerData.address = address;
    if (phone) this.buyerData.phone = phone;
    if (email) this.buyerData.email = email;
  }

  getBuyerData() {
    return this.buyerData;
  }
  clearBuyerData() {
    this.buyerData = { address: "", payment: null, phone: "", email: "" };
  }
  validateBuyerData() {
    let validationObject: TBuyerDataValidationObject = {};

    for (const [key, value] of Object.entries(this.buyerData) as [
      keyof IBuyer,
      string,
    ][]) {
      if (!value)
        validationObject[key] = this.EMPTY_DATA_VALIDATION_ERRORS[key];
    }
    return validationObject;
  }
}

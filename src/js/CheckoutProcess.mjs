import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// Converts form data into a JSON object
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// Reduces cart items to essential order info
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(`${this.outputSelector} #cartTotal`);
    const itemNumElement = document.querySelector(`${this.outputSelector} #num-items`);

    if (!summaryElement || !itemNumElement) return;

    const itemPrices = this.list.map((item) => item.FinalPrice);
    this.itemTotal = itemPrices.reduce((sum, price) => sum + price, 0);

    itemNumElement.textContent = this.list.length;
    summaryElement.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Assume 6% tax and base $10 shipping + $2/item after first
    this.tax = this.itemTotal * 0.06;
    this.shipping = 10 + Math.max(this.list.length - 1, 0) * 2;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElement = document.querySelector(`${this.outputSelector} #shipping`);
    const totalElement = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (!taxElement || !shippingElement || !totalElement) return;

    taxElement.textContent = `$${this.tax.toFixed(2)}`;
    shippingElement.textContent = `$${this.shipping.toFixed(2)}`;
    totalElement.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];
    if (!formElement) return;

    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log("Order successful:", response);
      // Optionally: clear cart, redirect, show confirmation, etc.
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  }
}

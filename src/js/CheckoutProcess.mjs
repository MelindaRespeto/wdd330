import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const services = new ExternalServices();

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
        const summaryEl = document.querySelector(this.outputSelector);

        if (!this.list.length) {
            summaryEl.innerHTML = `<p>Your cart is empty.</p>`;
            return;
        }

        this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
        this.calculateOrderTotal();

        summaryEl.innerHTML = `
      <p>Number of items: <span>${this.list.length}</span></p>
      <p>Item subtotal: <span>$${this.itemTotal.toFixed(2)}</span></p>
      <p>Shipping: <span>$${this.shipping.toFixed(2)}</span></p>
      <p>Tax: <span>$${this.tax.toFixed(2)}</span></p>
      <p><strong>Order total: <span>$${this.orderTotal.toFixed(2)}</span></strong></p>
    `;
    }

    calculateOrderTotal() {
        const numItems = this.list.length;
        this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
    }

    async checkout(form) {
        const formData = new FormData(form);
        const order = {
            orderDate: new Date(),
            fname: formData.get("fname"),
            lname: formData.get("lname"),
            street: formData.get("street"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip"),
            cardNumber: formData.get("cardNumber"),
            expiration: formData.get("expiration"),
            code: formData.get("code"),
            items: this.list,
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping,
            tax: this.tax.toFixed(2),
        };

        try {
            const response = await services.checkout(order);
            setLocalStorage(this.key, []);
            return response;
        } catch (err) {
            throw err;
        }
    }
}
import CheckoutProcess from "./CheckoutProcess.mjs";

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
    e.preventDefault();

    const form = document.querySelector("#checkout-form");
    const isValid = form.checkValidity();

    if (!isValid) {
        form.reportValidity();
        return;
    }

    try {
        await myCheckout.checkout(form);
        window.location.assign("./success.html");
    } catch (err) {
        console.log("Checkout failed:", err);
    }
});
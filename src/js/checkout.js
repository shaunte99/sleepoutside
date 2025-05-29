import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, setClick } from "./utils.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();
myCheckout.calculateOrderTotal();

document.forms["checkout"].addEventListener("submit", function (e) {
  e.preventDefault();
  myCheckout.checkout().then(() => {
    // Clear local storage cart
    localStorage.removeItem("so-cart");
    // Redirect to success page
    window.location.href = "./success.html";
  });
});

import { loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";

// Load header and footer
loadHeaderFooter();

// Initialize checkout process with cart key and summary selector
const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const zipInput = document.querySelector("#zip");
  const submitButton = document.querySelector("#checkoutSubmit");

  // Ensure elements exist before attaching listeners
  if (zipInput) {
    zipInput.addEventListener("blur", () => {
      order.calculateOrderTotal();
    });
  }

  if (submitButton) {
    submitButton.addEventListener("click", (e) => {
      e.preventDefault();
      order.checkout();
    });
  }
});

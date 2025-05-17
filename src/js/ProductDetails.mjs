 import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails() {
    document.querySelector('.product-detail__title').textContent = this.product.Name;
    document.querySelector('.product-detail__image img').src = this.product.Image;
    document.querySelector('.product-detail__image img').alt = this.product.Name;
    document.querySelector('.product-detail__color').textContent = this.product.Colors.join(', ');
    document.querySelector('.product-detail__description').textContent = this.product.Description;
    document.querySelector('.product-card__price').textContent = `$${this.product.FinalPrice}`;
  }
}

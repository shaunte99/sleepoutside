 // ProductList.mjs

import { productCardTemplate } from './productCardTemplate.js'; // Adjust the path if needed

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    // Get products based on category
    this.products = await this.dataSource.getData(this.category);
    this.renderList();
  }

  renderList() {
    this.listElement.innerHTML = '';

    this.products.forEach(product => {
      this.listElement.innerHTML += productCardTemplate(product);
    });
  }
}

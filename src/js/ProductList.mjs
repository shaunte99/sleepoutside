export default class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }

  async init() {
    await this.renderList();
    this.addSortListener();
  }

  async renderList(list = null) {
    const data = list || await this.dataSource.getData(this.category);
    const template = await this.getTemplate();
    const html = data.map(product => this.convertToHtml(product, template));
    this.element.innerHTML = html.join("");
  }

  async getTemplate() {
    // Adjust if you store the template differently
    const response = await fetch("../partials/productCard.html");
    return await response.text();
  }

  convertToHtml(product, template) {
    // Replace template placeholders
    let item = template;
    item = item.replace(/{{ID}}/g, product.Id);
    item = item.replace(/{{IMAGE}}/g, product.Image);
    item = item.replace(/{{NAME}}/g, product.Name);
    item = item.replace(/{{FINALPRICE}}/g, product.FinalPrice.toFixed(2));
    item = item.replace(/{{SUGGESTEDPRICE}}/g, product.SuggestedPrice.toFixed(2));
    return item;
  }

  addSortListener() {
    const sortSelect = document.getElementById("sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        const sortType = e.target.value;
        this.sortAndRender(sortType);
      });
    }
  }

  async sortAndRender(sortType) {
    const list = await this.dataSource.getData(this.category);

    let sorted = list;
    if (sortType === "name") {
      sorted = list.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortType === "price") {
      sorted = list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }

    this.renderList(sorted);
  }
}

 // productCardTemplate.js

export function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product-detail.html?product=${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
      </a>
    </li>
  `;
}

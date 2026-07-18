console.log("VERSION CHECK - product listing v2");
// product-listing.js
// Fetches product data and renders it into the .product-list <ul>
// on the Sleep Outside product listing page.

// Adjust this path to wherever your product JSON actually lives
// (e.g. served from your API, or a static file like ../json/tents.json)
const DATA_URL = "../json/tents.json";

// Your project uses a static HTML page per product (see vite.config.js)
// rather than one dynamic page. Map each product Id to its file.
// NOTE: guessed by name-matching — please verify these are correct,
// and there's no page listed yet for 989CG (Talus 3-Person).
const DETAIL_PAGES = {
  "344YJ": "cedar-ridge-rimrock-2.html",
  "880RT": "marmot-ajax-3.html",
  "985PR": "northface-alpine-3.html",
  "985RF": "northface-talus-4.html",
  // "989CG": "??? - no matching page in vite.config.js yet",
};

async function getProducts(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load products: ${response.status}`);
  }
  return await response.json();
}

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="../product_pages/${DETAIL_PAGES[product.Id] || "#"}">
        <img
          src="${product.Image}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
      <button
        class="card__button"
        data-id="${product.Id}"
        data-name="${product.Name}"
        data-price="${product.FinalPrice}"
        data-image="${product.Image}"
      >
        Add to Cart
      </button>
    </li>`;
}

function renderProductList(products, listElement) {
  listElement.innerHTML = products.map(productCardTemplate).join("");
}

function setListTitle(text, titleElement) {
  titleElement.textContent = text;
}

function addToCart(event) {
  const button = event.target.closest(".card__button");
  if (!button) return;

  const item = {
    Id: button.dataset.id,
    Name: button.dataset.name,
    FinalPrice: Number(button.dataset.price),
    Image: button.dataset.image,
  };

  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  cart.push(item);
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

async function init() {
  const listElement = document.querySelector(".product-list");
  const titleElement = document.querySelector(".product-list__title");

  try {
    const products = await getProducts(DATA_URL);
    setListTitle("Tents", titleElement);
    renderProductList(products, listElement);
    listElement.addEventListener("click", addToCart);
  } catch (error) {
    console.error(error);
    listElement.innerHTML = `<li>Sorry, we couldn't load products right now.</li>`;
  }
}

init();
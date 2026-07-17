import ProductData from "./ProductData.mjs";
import ProductList from "./Productlist.mjs";

const category =
  new URLSearchParams(window.location.search).get("category") || "tents";

const dataSource = new ProductData(category);

const listElement = document.querySelector(".product-list");

const productList = new ProductList(
  category,
  dataSource,
  listElement
);

productList.init();
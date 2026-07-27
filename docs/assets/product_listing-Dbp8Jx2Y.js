import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */console.log("VERSION CHECK - product listing v2");const o="../json/tents.json",l={"344YJ":"cedar-ridge-rimrock-2.html","880RT":"marmot-ajax-3.html","985PR":"northface-alpine-3.html","985RF":"northface-talus-4.html"};async function d(t){const a=await fetch(t);if(!a.ok)throw new Error(`Failed to load products: ${a.status}`);return await a.json()}function m(t){const a=t.FinalPrice<t.SuggestedRetailPrice;return`
    <li class="product-card">
      <a href="../product_pages/${l[t.Id]||"#"}">
        <img
          src="${t.Image}"
          alt="Image of ${t.Name}"
        />
        ${a?'<span class="product-card__discount-badge">Sale</span>':""}
        <h3 class="card__brand">${t.Brand.Name}</h3>
        <h2 class="card__name">${t.NameWithoutBrand}</h2>
        <p class="product-card__price">
          ${a?`<span class="product-card__price--original">$${t.SuggestedRetailPrice}</span>
                 <span class="product-card__price--final">$${t.FinalPrice}</span>`:`$${t.FinalPrice}`}
        </p>
      </a>
      <button
        class="card__button"
        data-id="${t.Id}"
        data-name="${t.Name}"
        data-price="${t.FinalPrice}"
        data-image="${t.Image}"
      >
        Add to Cart
      </button>
    </li>`}function u(t,a){a.innerHTML=t.map(m).join("")}function g(t,a){a.textContent=t}function p(t){const a=t.target.closest(".card__button");if(!a)return;const e={Id:a.dataset.id,Name:a.dataset.name,FinalPrice:Number(a.dataset.price),Image:a.dataset.image},r=JSON.parse(localStorage.getItem("so-cart"))||[];r.push(e),localStorage.setItem("so-cart",JSON.stringify(r))}async function h(){const t=document.querySelector(".product-list"),a=document.querySelector(".product-list__title");try{const e=await d(o),s=new URLSearchParams(window.location.search).get("search");let n=e,c="Tents";s&&(n=e.filter(i=>i.Name.toLowerCase().includes(s.toLowerCase())),c=`Search results for "${s}"`),g(c,a),u(n,t),t.addEventListener("click",p)}catch(e){console.error(e),t.innerHTML="<li>Sorry, we couldn't load products right now.</li>"}}h();

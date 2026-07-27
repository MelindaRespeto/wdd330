document.querySelector("#search-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = document.querySelector("#search-input").value.trim();

    if (searchTerm) {
        window.location.href = `/product_listing/index.html?search=${encodeURIComponent(searchTerm)}`;
    }
});
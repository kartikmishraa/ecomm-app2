console.log("script loaded");

/**
 * @todo: Show "No Items Found" when no item matches in search
 */

/**
 * @description Interface to store each Product/Item
 */
interface Rating {
  rate: number;
}
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: Rating; // iska bhi interface?
}
interface CartItem {
  _id: number;
  qty: number;
}

var t: Product[];
let cart: CartItem[] = [];

let isSortedUpByPrice = false;
let isSortedUpByRating = false;

async function main() {
  t = await getAllProducts();
  dbInit();
  cartCounter();
  // console.log(t);
}
main();

/**
 * @description Takes the user from landing page to catalogue
 */
function exploreCatalogue() {
  window.scrollTo(0, 0);
  document.getElementById("main-section")!.className = "container";
  document.getElementById("t1")!.style.display = "block";
  document.getElementById("carouselExampleDark")!.style.display = "none";

  createCards(t);
}

/**
 * @description Implementing search functionality
 */
let searchInput = document.getElementById("search-input");
searchInput?.addEventListener("change", (e) => {
  const word: string = e.target!.value;

  let searchResult: Product[] = searchItems(word);
  createCards(searchResult);
});

/**
 * @param word : string to search
 * @returns Product[] with filtered items as per search
 */
function searchItems(word: string): Product[] {
  return t.filter((item: Product) => item.title.includes(word));
}

/**
 * @description Implementing SORT by PRICE functionality
 */
let sortByPriceBtn = document.getElementById("sort-price");
sortByPriceBtn?.addEventListener("click", () => {
  sortByPriceBtn!.innerHTML = `Price`;
  sortByRatingBtn!.innerHTML = `Rating`;

  let sortedProductList: Product[];
  if (!isSortedUpByPrice) {
    sortByPriceBtn!.innerHTML += ` <i class="fa-solid fa-up-long"></i>`;
    isSortedUpByPrice = !isSortedUpByPrice;
    sortedProductList = getSortedProductsList(isSortedUpByPrice, "price");
    Toasty("Low to High Price");
  } else {
    sortByPriceBtn!.innerHTML += ` <i class="fa-solid fa-down-long"></i>`;
    isSortedUpByPrice = !isSortedUpByPrice;
    sortedProductList = getSortedProductsList(isSortedUpByPrice, "price");
    Toasty("High to Low Price");
  }

  createCards(sortedProductList);
});

/**
 * @description Implementing SORT by RATING functionality
 */
let sortByRatingBtn = document.getElementById("sort-rating");
sortByRatingBtn?.addEventListener("click", () => {
  sortByRatingBtn!.innerHTML = `Rating`;
  sortByPriceBtn!.innerHTML = `Price`;

  let sortedProductList: Product[];
  if (!isSortedUpByRating) {
    sortByRatingBtn!.innerHTML += ` <i class="fa-solid fa-up-long"></i>`;
    isSortedUpByRating = !isSortedUpByRating;
    sortedProductList = getSortedProductsList(isSortedUpByRating, "rating");
    Toasty("Low to High Rating");
  } else {
    sortByRatingBtn!.innerHTML += ` <i class="fa-solid fa-down-long"></i>`;
    isSortedUpByRating = !isSortedUpByRating;
    sortedProductList = getSortedProductsList(isSortedUpByRating, "rating");
    Toasty("High to Low Rating");
  }

  createCards(sortedProductList);
});

/**
 * @param toSortUp A boolean that tells whether to sort in ascending or descending
 * @param sortBy "price" or "rating", specifies the sorting factor
 * @returns Product[] list of items in sorted order
 */
function getSortedProductsList(toSortUp: boolean, sortBy: string): Product[] {
  let sortedList: Product[];

  const sortUpByRating = (item1: Product, item2: Product) =>
    item1.rating.rate - item2.rating.rate;
  const sortDownByRating = (item1: Product, item2: Product) =>
    item2.rating.rate - item1.rating.rate;

  const sortUpByPrice = (item1: Product, item2: Product) =>
    item1.price - item2.price;
  const sortDownByPrice = (item1: Product, item2: Product) =>
    item2.price - item1.price;

  if (sortBy === "price") {
    if (toSortUp) sortedList = t.sort(sortUpByPrice);
    else sortedList = t.sort(sortDownByPrice);
  } else {
    if (toSortUp) sortedList = t.sort(sortUpByRating);
    else sortedList = t.sort(sortDownByRating);
  }

  return sortedList;
}

/**
 * @description To reload the page when a button is clicked
 */
function reloadAndScrollTop() {
  location.reload();
  window.scrollTo(0, 0);
}

/**
 * @description Function to call API to fetch data
 * @returns Promise<Product[]>
 */
async function getAllProducts(): Promise<Product[]> {
  const data = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  return data;
}

/**
 * @description Function to populate page with item cards
 * @param Product[]
 */
const createCards = (data: Product[]) => {
  // Clearing the DOM
  document.getElementById("card-container")!.innerHTML = ``;

  // Now creating the cards
  const _cardHolder = document.createElement("div");
  _cardHolder.id = "card-holder";
  _cardHolder.style.display = "flex";
  _cardHolder.style.flexFlow = "row wrap";
  _cardHolder.style.justifyContent = "space-evenly";
  _cardHolder.style.gap = "20px";

  document.getElementById("card-container")?.appendChild(_cardHolder);

  data.forEach((item: Product) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.style.width = "18rem";
    cardEl.style.margin = "1.6vmax 0vmax";

    cardEl.innerHTML = `
      <div class="img-box">
        <img
        src="${item.image}"
        class=""
        alt="item-img"
        onclick=""
        height="200px"
        width="150px"
        />
      </div>
      <div class="card-body content-box">
        <h3 class="price">$${item.price}</h3>
        <h3 class="price">${item.rating.rate} <i class="fa-solid fa-star"></i></h3>
        <hr />
        <button class="btn btn-secondary myBtn buy" onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
      `;

    _cardHolder.appendChild(cardEl);
  });
};

/**
 *@description The function that is called when "Add to Cart" button is pressed
 * @param id The item id that will be added to cart
 */
function addToCart(id: number) {
  let newCartItem: CartItem = { _id: id, qty: 1 };
  pushToCart(newCartItem);

  console.log("addToCart() called");
  cartCounter();
  Toasty("Added to cart");
}

/**
 * @description Function that handles the ADD to card LOGIC
 * @param itemToAdd Cart item to be added
 */
const pushToCart = (itemToAdd: CartItem) => {
  if (cart.find((item) => item._id === itemToAdd._id)) {
    let ToUpdate: CartItem = cart.find((item) => item._id === itemToAdd._id)!;
    ToUpdate!.qty += itemToAdd.qty;
  } else {
    cart.push(itemToAdd);
  }

  let updatedCart; //= JSON.parse(window.sessionStorage.getItem("cart")!);
  updatedCart = cart;
  window.sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  console.log(updatedCart);
};

function cartCounter() {
  // console.log("total items in cart: ", cart.length);
  const CART_COUNTER = document.getElementById("cart-counter");
  CART_COUNTER!.innerText = `Cart (${cart.length})`;
}

/**
 * @description Function to display a toast
 * @param message Message to be displayed
 */
function Toasty(message: string) {
  let toast = document.getElementById("toast");
  toast!.className = "show";
  toast!.innerHTML = message;

  setTimeout(function () {
    toast!.className = toast!.className.replace("show", "");
  }, 3000);
}

const dbInit = () => {
  const checkInStore = window.sessionStorage.getItem("cart");
  checkInStore ? (cart = JSON.parse(checkInStore)) : (cart = []);
};

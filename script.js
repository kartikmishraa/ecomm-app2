var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
console.log("script loaded");
var t;
var cart = [];
var isSortedUpByPrice = false;
var isSortedUpByRating = false;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllProducts()];
                case 1:
                    t = _a.sent();
                    dbInit();
                    cartCounter();
                    return [2 /*return*/];
            }
        });
    });
}
main();
/**
 * @description Takes the user from landing page to catalogue
 */
function exploreCatalogue() {
    window.scrollTo(0, 0);
    document.getElementById("main-section").className = "container";
    document.getElementById("t1").style.display = "block";
    document.getElementById("carouselExampleDark").style.display = "none";
    createCards(t);
}
/**
 * @description Implementing search functionality
 */
var searchInput = document.getElementById("search-input");
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("change", function (e) {
    var word = e.target.value;
    var searchResult = searchItems(word);
    createCards(searchResult);
});
/**
 * @param word : string to search
 * @returns Product[] with filtered items as per search
 */
function searchItems(word) {
    return t.filter(function (item) { return item.title.includes(word); });
}
/**
 * @description Implementing SORT by PRICE functionality
 */
var sortByPriceBtn = document.getElementById("sort-price");
sortByPriceBtn === null || sortByPriceBtn === void 0 ? void 0 : sortByPriceBtn.addEventListener("click", function () {
    sortByPriceBtn.innerHTML = "Price";
    sortByRatingBtn.innerHTML = "Rating";
    var sortedProductList;
    if (!isSortedUpByPrice) {
        sortByPriceBtn.innerHTML += " <i class=\"fa-solid fa-up-long\"></i>";
        isSortedUpByPrice = !isSortedUpByPrice;
        sortedProductList = getSortedProductsList(isSortedUpByPrice, "price");
        Toasty("Low to High Price");
    }
    else {
        sortByPriceBtn.innerHTML += " <i class=\"fa-solid fa-down-long\"></i>";
        isSortedUpByPrice = !isSortedUpByPrice;
        sortedProductList = getSortedProductsList(isSortedUpByPrice, "price");
        Toasty("High to Low Price");
    }
    createCards(sortedProductList);
});
/**
 * @description Implementing SORT by RATING functionality
 */
var sortByRatingBtn = document.getElementById("sort-rating");
sortByRatingBtn === null || sortByRatingBtn === void 0 ? void 0 : sortByRatingBtn.addEventListener("click", function () {
    sortByRatingBtn.innerHTML = "Rating";
    sortByPriceBtn.innerHTML = "Price";
    var sortedProductList;
    if (!isSortedUpByRating) {
        sortByRatingBtn.innerHTML += " <i class=\"fa-solid fa-up-long\"></i>";
        isSortedUpByRating = !isSortedUpByRating;
        sortedProductList = getSortedProductsList(isSortedUpByRating, "rating");
        Toasty("Low to High Rating");
    }
    else {
        sortByRatingBtn.innerHTML += " <i class=\"fa-solid fa-down-long\"></i>";
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
function getSortedProductsList(toSortUp, sortBy) {
    var sortedList;
    var sortUpByRating = function (item1, item2) {
        return item1.rating.rate - item2.rating.rate;
    };
    var sortDownByRating = function (item1, item2) {
        return item2.rating.rate - item1.rating.rate;
    };
    var sortUpByPrice = function (item1, item2) {
        return item1.price - item2.price;
    };
    var sortDownByPrice = function (item1, item2) {
        return item2.price - item1.price;
    };
    if (sortBy === "price") {
        if (toSortUp)
            sortedList = t.sort(sortUpByPrice);
        else
            sortedList = t.sort(sortDownByPrice);
    }
    else {
        if (toSortUp)
            sortedList = t.sort(sortUpByRating);
        else
            sortedList = t.sort(sortDownByRating);
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
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://fakestoreapi.com/products").then(function (res) {
                        return res.json();
                    })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    });
}
/**
 * @description Function to populate page with item cards
 * @param Product[]
 */
var createCards = function (data) {
    var _a;
    // Clearing the DOM
    document.getElementById("card-container").innerHTML = "";
    // Now creating the cards
    var _cardHolder = document.createElement("div");
    _cardHolder.id = "card-holder";
    _cardHolder.style.display = "flex";
    _cardHolder.style.flexFlow = "row wrap";
    _cardHolder.style.justifyContent = "space-evenly";
    _cardHolder.style.gap = "20px";
    (_a = document.getElementById("card-container")) === null || _a === void 0 ? void 0 : _a.appendChild(_cardHolder);
    data.forEach(function (item) {
        var cardEl = document.createElement("div");
        cardEl.className = "card";
        cardEl.style.width = "18rem";
        cardEl.style.margin = "1.6vmax 0vmax";
        cardEl.innerHTML = "\n      <div class=\"img-box\">\n        <img\n        src=\"".concat(item.image, "\"\n        class=\"\"\n        alt=\"item-img\"\n        onclick=\"\"\n        height=\"200px\"\n        width=\"150px\"\n        />\n      </div>\n      <div class=\"card-body content-box\">\n        <h3 class=\"price\">$").concat(item.price, "</h3>\n        <h3 class=\"price\">").concat(item.rating.rate, " <i class=\"fa-solid fa-star\"></i></h3>\n        <hr />\n        <button class=\"btn btn-secondary myBtn buy\" onclick=\"addToCart(").concat(item.id, ")\">Add to Cart</button>\n        </div>\n      ");
        _cardHolder.appendChild(cardEl);
    });
};
/**
 *@description The function that is called when "Add to Cart" button is pressed
 * @param id The item id that will be added to cart
 */
function addToCart(id) {
    var newCartItem = { _id: id, qty: 1 };
    pushToCart(newCartItem);
    console.log("addToCart() called");
    cartCounter();
    Toasty("Added to cart");
}
/**
 * @description Function that handles the ADD to card LOGIC
 * @param itemToAdd Cart item to be added
 */
var pushToCart = function (itemToAdd) {
    if (cart.find(function (item) { return item._id === itemToAdd._id; })) {
        var ToUpdate = cart.find(function (item) { return item._id === itemToAdd._id; });
        ToUpdate.qty += itemToAdd.qty;
    }
    else {
        cart.push(itemToAdd);
    }
    var updatedCart; //= JSON.parse(window.sessionStorage.getItem("cart")!);
    updatedCart = cart;
    window.sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    console.log(updatedCart);
};
function cartCounter() {
    // console.log("total items in cart: ", cart.length);
    var CART_COUNTER = document.getElementById("cart-counter");
    CART_COUNTER.innerText = "Cart (".concat(cart.length, ")");
}
/**
 * @description Function to display a toast
 * @param message Message to be displayed
 */
function Toasty(message) {
    var toast = document.getElementById("toast");
    toast.className = "show";
    toast.innerHTML = message;
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
var dbInit = function () {
    var checkInStore = window.sessionStorage.getItem("cart");
    checkInStore ? (cart = JSON.parse(checkInStore)) : (cart = []);
};

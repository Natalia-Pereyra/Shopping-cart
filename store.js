//I need to populate the store.html w/ all json files, normally i would have to do a fetch request but with parcel i can do it the following way:

import items from "./items.json";
import formatCurrency  from "./utilities/formatCurrency"
import { addToCart } from "./shoppingCart";
import addGlobalEventListener from "./utilities/addGlobalEventListener";

const storeItemTemplate = document.getElementById("store-item-template");
const storeItemsContainer = document.querySelector("[data-store-container]");
const IMAGE_URL = "https://dummyimage.com/420x260";


export function setUpStore() {
    if(storeItemsContainer == null) return
    
    addGlobalEventListener("click", '[data-add-to-cart-button]', e => {
        const id = e.target.closest("[data-id]").dataset.itemId;
        addToCart(parseInt(id)) // to get the id, ill pass the data atrribute id given to "const container" in line 25. ParseInt() converts the string into a number because in the items.json, the id is a number 

    })
    items.forEach(renderStoreItem)
}

function renderStoreItem (item) {
    const storeItem = storeItemTemplate.content.cloneNode(true); // true meaning it will take the whole HTML 

    const container = storeItem.querySelector("[data-id]");
    container.dataset.itemId = item.id // I'm taking the id of item and setting it as a container's data attribute

    const name = storeItem.querySelector("[data-name]");
    name.innerText = item.name;

    const category = storeItem.querySelector("[data-category]");
    category.innerText = item.category;

    const img = storeItem.querySelector("[data-image]");
    img.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;

    const priceItem = storeItem.querySelector("[data-priceCents]");
    // priceItem.innerText = `$${(item.priceCents) / 100}.00`;
    // with is js object, i can handle numbers, commas and decimals much better, instead of doing what I did in the previous line. with undefined added, it will take the language that the user is using 
    //  const formatter = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD"}) --- I put it in "formatCurrency.js" so i can use it again in the shopping cart
     priceItem.innerText = formatCurrency(item.priceCents / 100) // format() is an inbuilt JS function

    storeItemsContainer.appendChild(storeItem);
}

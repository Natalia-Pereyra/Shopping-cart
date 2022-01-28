import items from "./items.json";
import formatCurrency from "./utilities/formatCurrency";
import addGlobalEventListener from "./utilities/addGlobalEventListener";

const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper]");
const cartButton = document.querySelector("[data-remove-from-cart-button]");
const IMAGE_URL = "https://dummyimage.com/210X130";
const cartTemplate = document.getElementById("cart-item-template");
const cartContainer = document.getElementById("cart-div-container");
const cartQuantity = document.querySelector("[data-cart-quantity]");
const cartTotal = document.querySelector("[data-cart-total]");
const cart = document.querySelector("[data-cart]");
const SESSION_STORAGE_KEY = "SHOPPING_CART-cart"; // always prefix storage's const 
let shoppingCart = loadCart();


    //Remove items from cart
    
    export function setUpShoppingCart() {
       addGlobalEventListener("click", "[data-remove-from-cart-button]", e => {
         const id = parseInt(e.target.closest("[data-id]").dataset.itemId);
         removefromCart(id);
       })
    renderCart();
    }
    
    // Show/hide cart when clicked
    
    cartButton.addEventListener("click", () => {
        cartItemsWrapper.classList.toggle("invisible");
    })

    // Add items to cart
      // handle click event for adding, I'll export this function into store.js

    export function addToCart(id) {
      const existingItem = shoppingCart.find(entry => entry.id === id)
      if(existingItem) {// if it exist in the shopping card, add one, else push it to the array
          existingItem.quantity++
      } else {
          shoppingCart.push({ id: id, quantity: 1}); // for now i'll add 1 item with certain id
        }
        renderCart(); // now i want to render the data from the clicked "addToCart button"
        saveCart();
      }
    
      // Show/hide cart button when it has no items or when it goes from 0 to 1 item
        
      function renderCart() {
        if(shoppingCart.length === 0) {
            hideCart()
        } else {
            showCart()
            renderCartItems()
        }
    }
    
    function hideCart() {
    cart.classList.add("invisible");
    cartItemsWrapper.classList.add("invisible")
    }
    
    function showCart() {
    cart.classList.remove("invisible");
    }
    
    //Remove items from cart
    function removefromCart(id) {
        const existingItem = shoppingCart.find(entry => entry.id === id);
        if(existingItem == null) return
        shoppingCart = shoppingCart.filter(entry => entry.id !== id)
        renderCart();
        saveCart();
    }
    
    // Handle multiple of the same item in the cart and get it to sum the item's prices 
      
        function renderCartItems() { // the function renderStoreItem in store.js does pretty much the same so I'm gonna copy and paste that
        cartQuantity.innerText = shoppingCart.length;
        // calculate the items total price
    //to do this, I'm gonna loop again in shopping cart to get the item which will give us the price, using reduce which will give us 1 item
    const totalCents = shoppingCart.reduce((sum, entry) => {
        const item = items.find(i => entry.id === i.id);
        return sum + item.priceCents * entry.quantity;
    }, 0) //empezamos en 0
    
    cartTotal.innerText = formatCurrency(totalCents / 100)
    cartContainer.innerHTML = "";
    
    shoppingCart.forEach(entry => {
      const item = items.find(i => entry.id === i.id) //
      const cartItem = cartTemplate.content.cloneNode(true); // true meaning it will take the whole HTML 
  
      const container = cartItem.querySelector("[data-id]");
      container.dataset.itemId = item.id // I'm taking the id of item and setting it as a container's data attribute
  
      const name = cartItem.querySelector("[data-name]");
      name.innerText = item.name;

      if(entry.quantity > 1) { // so it doesn't show "x1" when i only have 1 item 
          const quantity = cartItem.querySelector("[data-quantity]");
          quantity.innerText = `x${entry.quantity}`;
      }
  
      const img = cartItem.querySelector("[data-image]");
      img.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`;
  
      const priceItem = cartItem.querySelector("[data-priceCents]");
       priceItem.innerText = formatCurrency(item.priceCents * entry.quantity / 100) // format() is an inbuilt JS function
  
      cartContainer.appendChild(cartItem);     
    })
    }

    // Persist across multiple pages, which means we need to save the data 
   
    function saveCart() {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
    }

    function loadCart() {
    const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
    return JSON.parse(cart) || [] // If there's nothing in out session storage, we will default into an empty array
    }









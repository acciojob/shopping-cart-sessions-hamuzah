// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
@@ -11,6 +8,14 @@ const products = [

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.querySelector("#cart-list");
const clearCarts = document.querySelector("#clear-cart-btn");


clearCarts.addEventListener("click",clearCart);

// Cart data in session storage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
@@ -19,19 +24,79 @@ function renderProducts() {
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  //   console.log(addToCartButtons)
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {}
function renderCart() {
  cartList.innerHTML = "";
  // console.log(cart);
  cart.forEach((item) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "Remove Cart";
    btn.className ="remove-cart";
    btn.setAttribute("data-id", item.id);
    const btns = document.querySelectorAll(".remove-cart")[0];

    // console.log(btns);
    btn.addEventListener("click", () => {
        const productId = parseInt(btn.getAttribute("data-id"));
        removeFromCart(productId);
      });
    li.textContent = `${item.name}- \$${item.price}`;

    cartList.append(li,btn);
  });
}

// Add item to cart
function addToCart(productId) {}
function addToCart(productId) {
  const product = products.find((prod) => prod.id === productId);

//   console.log(product);
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
  });

  sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {}
function removeFromCart(productId) {

   const index =  cart.findIndex((item)=>item.id === productId);

   if(index !== -1){
    cart.splice(index,1);

    sessionStorage.setItem("cart",JSON.stringify(cart));

    renderCart();
   }
}

// Clear cart
function clearCart() {}
function clearCart() {


  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial render
renderProducts();
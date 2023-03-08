//CART
let cartIcon = document.querySelector('#icon_cart')
let cartIcon2 = document.querySelector('#icon_cart2')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#cart_close')
let navPrueba = document.querySelector('#prueba')
//OPEN CART
cartIcon.onclick = () => {
  cart.classList.add("active");
};
cartIcon2.onclick = () => {
  cart.classList.add("active");
  navPrueba.classList.toggle('open')
  const isOpen = navPrueba.classList.contains('open')
  toggleBtnIcon.classList = isOpen
  ? 'fa-solid fa-bars'
  : 'fa-solid fa-xmark'
};
//CLOSE CART
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//CART WORKING JS
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
}else {
  ready();
}

//MAKING FUNCTION
function ready(){
  //REMOVE ITEMS FORM CART
  var removeCartButtons = document.getElementsByClassName('remove_cart')
  console.log(removeCartButtons)
  for (var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i]
    button.addEventListener("click", removeCartItem)
  }
  //QUANTITY CHANGES
  var quantityInputs = document.getElementsByClassName("quantity_cart");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //ADD TO CART
  var addCart = document.getElementsByClassName("add_cart");
  for (var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //BUY BUTTON WORK
  document.getElementsByClassName("btn_buy")[0].addEventListener("click", buyBottonClicked);
}
//BUY BUTTON
function buyBottonClicked(){
  alert("Tu pedido esta listo");
  var cartContent = document.getElementsByClassName("container_cart")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}

//REMOVE ITEMS FORM CART
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

//QUANTITY CHANGES
function quantityChanged(event){
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

//ADD TO CART
function addCartClicked(event){
  var button = event.target
  var shopProducts = button.parentElement
  var title = shopProducts.getElementsByClassName("product_title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("img_product")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("box_cart");
  var cartItems = document.getElementsByClassName("container_cart")[0];
  var cartItemsNames = cartItems.getElementsByClassName("product_title_cart");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("Ya agregaste este producto al carrito");
      return;
    }
  }
var cartBoxContent = `
          <img src="${productImg}" alt="" class="img_cart">
          <div class="box_detail">
              <div class="product_title_cart">${title}</div>
              <div class="price_cart">${price}</div>
              <input type="number" value="1" class="quantity_cart">
          </div>
          <!--REMOVE CART-->
          <i class="fa-solid fa-trash remove_cart"></i>`;
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName("remove_cart")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("quantity_cart")[0].addEventListener("change", quantityChanged);
}

//UPDATE TOTAL
function updatetotal(){
  var cartContent = document.getElementsByClassName("container_cart")[0];
  var cartBoxes = cartContent.getElementsByClassName("box_cart");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i]
    var priceElement = cartBox.getElementsByClassName("price_cart")[0];
    var quantityElement = cartBox.getElementsByClassName('quantity_cart')[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
    //IF PRICE CONTAIN SOME CENTS VALUE
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("price_total")[0].innerText = "$" + total;

}
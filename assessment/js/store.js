//variables

/*const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn= document.querySelector('.close-cart');
const clearCartBtn= document.querySelector('.clear-cart');
const cartDOM= document.querySelector('.cart');
const cartOverlay= document.querySelector('.cart-overlay');
const cartItems= document.querySelector('.cart-items');
const cartTotal= document.querySelector('.cart-total');
const cartContent= document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//Cart

let cart = [];

//Getting the products
class Products {
 async getProducts(){
     try {
        let result = await fetch('products.json');
        let data = await result.json();

        let products = data.items;
        products = products.map(item => {
          const {title,price} = item.fields  
          const {id} = item.sys
          const image = item.fields.image.fields.file.url;
          return {title,price,id,image}
        })
        return products
        } catch (error) {
          console.log(error);
        }
    }
  }

// UI - display products
class UI {
    displayProducts(products){
        let result = '';
        products.forEach(products => {
            result += `
            <!--Single Product-->
        <article class="product">
            <div class="img-container">
                <img 
                src= ${product.image}
                height="500" alt="product" class="product-img">
                <button class="bag-btn" data-id=${product.id}>
                    <i class="fas fa-shopping-cart"></i>
                    Add to cart
                </button>
            </div>
            <h3>${product.title}</h3>
            <h4>${product.price}</h4>
        </article>
        <!--End of Single Product-->
            `;
        });
        productsDOM.innerHTML = result;
    }
}


//local storage
class Storage {}

document.addEventListener("DOMContentLoaded", ()=> {
const ui = new UI ();
const products = new Products();


// Get all Products
products.getProducts().then(products => 
    ui.displayProducts(products))
});
*/

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let addToCartButtons = document.getElementsByClassName('btn-primary')
let cartContainer = document.getElementsByTagName('tbody')[0]
let quantityFields = document.getElementsByClassName('num')
let delete_buttons = document.getElementsByClassName('uk-button-danger')

// picking up all the Add-To-Cart buttons
for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', addToCart)

}
// This function helps to add items to our cart
function addToCart(event) {

    let itemContainer = document.createElement('tr')
    let btn = event.target
    let btnGrandParent = btn.parentElement.parentElement
    let btnParent = btn.parentElement
    let itemImage = btnGrandParent.children[0].src
    let itemName = btnParent.children[0].innerText
    let itemPrice = btnParent.children[1].innerText

    itemContainer.innerHTML = `
    <td><input class="uk-checkbox" type="checkbox"></td>
    <td><img class="uk-preserve-width uk-border-circle" src=${itemImage} width="40" alt=""></td>
    <td class="uk-table-link">
        <h3 class = "item-name">${itemName}</h3>
    </td>
    <td class="uk-text-truncate item-price"><h3>${itemPrice}</h3></td>
    <td><input type = 'number' class = 'num' value = '1'></td>
    <td class="uk-text-truncate total-price"><h3>${itemPrice}</h3></td>
    <td><button class="uk-button uk-button-danger" type="button">Remove</button></td>
`
    cartContainer.append(itemContainer)

    // Accessing individual quantity fields
    for (let i = 0; i < quantityFields.length; i++) {
        quantityFields[i].value = 1
        quantityFields[i].addEventListener('change', totalCost)
    }

    // Accessing individual quantity fields
    for (let i = 0; i < delete_buttons.length; i++) {
        delete_buttons[i].addEventListener('click', removeItem)
    }

    grandTotal()
}

// This function helps to multiply the quantity and the price
function totalCost(event) {
    let quantity = event.target
    quantity_parent = quantity.parentElement.parentElement
    price_field = quantity_parent.getElementsByClassName('item-price')[0]
    total_field = quantity_parent.getElementsByClassName('total-price')[0]
    price_field_content = price_field.innerText.replace('$', '')
    total_field.children[0].innerText = '$' + quantity.value * price_field_content
    grandTotal()
    if (isNaN(quantity.value) || quantity.value <= 0) {
        quantity.value = 1
    }
}

// This function helps to add up the total of the items
function grandTotal() {
    let total = 0
    let grand_total = document.getElementsByClassName('grand-total')[0]
    all_total_fields = document.getElementsByClassName('total-price')
    for (let i = 0; i < all_total_fields.length; i++) {
        all_prices = Number(all_total_fields[i].innerText.replace('$', ''))
        total += all_prices
    }
    grand_total.children[0].innerText = "$" + total
    grand_total.children[0].style.fontWeight = 'bold'
    console.log(total)
}

function removeItem(event) {
    del_btn = event.target
    del_btn_parent = del_btn.parentElement.parentElement
    del_btn_parent.remove()
    console.log(del_btn)
    grandTotal()
}
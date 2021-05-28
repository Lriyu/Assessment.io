let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name:'iphone 11 purple',
        tag: 'iphone11purple',
        price: 1,
        inCart: 0
    },
    {
        name: 'iphone 11 white',
        tag: 'iphone11white',
        price: 2,
        inCart: 0
    },
    {
        name: 'iphone 12 red',
        tag: 'iphone12red',
        price: 3,
        inCart: 0
    }, 
    {
        name: 'iphone 12 blue',
        tag: 'iphone12blue',
        price: 4,
        inCart: 0
    }, 
    {
        name: 'iphone 11 black',
        tag: 'iphone11black',
        price: 5,
        inCart: 0
    },
    {
        name: 'iphone 11 gold',
        tag: 'iphone11gold',
        price: 6,
        inCart: 0
    },
    {
        name: 'iphone 12 dark blue',
        tag: 'iphone12darkblue',
        price: 7,
        inCart: 0
    },
    {
        name: 'iphone 12 ocean blue',
        tag: 'iphone12oceanblue',
        price: 8,
        inCart: 0
    }


]


for(let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
   
    let productNumbers = localStorage.getItem('cartNumbers', 1);
 

    productNumbers = parseInt(productNumbers);
   
    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);    
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    
    }    

    setItems(product);
}
function setItems(product) {
   let cartItems = localStorage.getItem('productsIncart');
   cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsIncart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
//console.log("the product price is", product.price)
let cartCost = localStorage.getItem('totalCost');

console.log("My cartCost is", cartCost);
console.log(typeof cartCost );

if(cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
    
}else {
    
    localStorage.setItem("totalCost", product.price);
    }
}

function displayCart () {
    let cartItems = localStorage.getItem("productsIncart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products-container");
    let cartCost = localStorage.getItem('totalCost');


    console.log(cartItems);
    if (cartItems && productContainer)  {
        productContainer.innerHTML = '' ; 
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <i class='bx bxs-x-circle'></i>
                <img src="./images/${item.tag}.png" width="100px">
                <span>${item.name}</span>
                </div>
                <div class="price">₱${item.price},00</div>
                <div class="quantity">
                <i class='bx bxs-chevron-left-circle' ></i>
                <span>${item.inCart}</span>
                <i class='bx bxs-chevron-right-circle' ></i>
                </div>
                <div class="total">
                ₱${item.inCart * item.price},00
                </div>

            `

        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total
        </h4>
        <h4 class="basketTotal">
            ₱${cartCost},00     
        </h4>
        `

    }
}



onLoadCartNumbers();
displayCart();
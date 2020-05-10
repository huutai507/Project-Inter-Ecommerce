let carts = document.querySelectorAll('.product_cart_button');
console.log('This is carts', carts)
let cartItems = localStorage.getItem('productsIncart');

async function sendData() {
    let sendTokenToServer = await messaging.getToken()
    let totalCost = localStorage.getItem('totalCost');
    totalCost = parseInt(totalCost);
    let name = document.querySelector('.customerName').value;
    let dateOfBirth = document.querySelector('.date-of-birth').value;
    let gender = document.querySelector('.gender').value;
    let address = document.querySelector('.address').value;
    let phoneNumber = document.querySelector('.number-phone').value;
    let email = document.querySelector('.email').value;
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems)
    let newData = [];
    for (let value in cartItems) {
        newData.push(cartItems[value])
    }
    let inforCustomer = {
        name,
        dateOfBirth,
        gender,
        address,
        phoneNumber,
        email,
        totalCost,
        cartItems: newData
    }
    let stripeHandler = StripeCheckout.configure({
        key: stripePublicKey,
        locale: 'en',
        token: function (token) {
            axios.post(`http://localhost:4500/order`, {
                data: inforCustomer,
                stripeTokenId: token.id,
                token,
                totalCost,
                tokenMessage: sendTokenToServer
            }).then((response) => {
            })
            alert('Thanks for payment. Please check your email !')

        }
    })
    stripeHandler.open({
        amount: totalCost * 100
    })
}

displayCart();
onLoadCartNumbers();

let products = document.getElementById('dataProduct').textContent;
products = JSON.parse(products);
for (let i = 0; i < products.length; i++) {
    products[i].inCart = 0;
}


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);

    })
}




function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart_count span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart_count span').textContent = productNumbers - 1;
    } else if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart_count span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart_count span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    // The first time cartItems return "null"
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) { // This is called for the second time because cartsItems != null
        if (cartItems[product.id] == undefined) { // This is occurs when click cartItems two
            cartItems = {
                ...cartItems,
                [product.id]: product
            }
        }
        cartItems[product.id].inCart += 1;
    } else { // This is called for the first time because cartItems will "null" for the first time
        product.inCart = 1;
        // Create new object with [product.id] is varible, product is obj when my click button
        cartItems = {
            [product.id]: product
        }
    }
    localStorage.setItem("productsIncart", JSON.stringify(cartItems));
}

function totalCost(product, action) {
    let cart = localStorage.getItem("totalCost");

    if (action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - (product.price - product.promotion));
    } else if (cart != null) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + (product.price - product.promotion));

    } else {
        localStorage.setItem("totalCost", (product.price - product.promotion));
    }
}

function displayCart() {
    let cartsItems = localStorage.getItem("productsIncart");
    cartsItems = JSON.parse(cartsItems);
    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector(".cart_items");
    let productTotal = document.querySelector(".order_total_content");
    if (cartsItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartsItems).map((item, index) => {
            productContainer.innerHTML +=
                `<ul class="cart_list">
                    <li class="cart_item clearfix d-flex justify-content-between align-items-center">
                    <div class="delete_product"><i class="far fa-trash-alt" style="font-size: 25px; cursor: pointer; color:#3366FF"></i></div>
                    <div class="" style="display:none" name="productId"><span>${item.id}</span></div>
                    <div class="cart_item_image" name="image">
                        <img src="${item.image}" width="115px" height="115px" alt=""/>
                    </div>
                    <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                        <div class="cart_item_name cart_info_col" style="width:30%;">
                            <div class="cart_item_title">Name</div>
                            <div class="cart_item_text" name="productName"  value="${item.productName}">${item.productName}</div>
                        </div>
                        <div class="cart_item_color cart_info_col">
                            <div class="cart_item_title">Color</div>
                            <div class="cart_item_text" name="color">
                                <span style="background-color:#999999;"></span>${item.color}
                            </div>
                        </div>
                        <div class="cart_item_quantity cart_info_col">
                            <div class="cart_item_title">Quantity</div>
                            <div class="quantity" name="quantity" style="display:block; margin-top:38px">
                                <i class="fas fa-minus decrease pr-2" style="font-size: 20px; cursor: pointer; color: #ccc"></i>
                                <span>${item.inCart}</span>
                                <i class="fas fa-plus increase pl-2" style="font-size: 20px; cursor: pointer; color: #ccc" ></i>
                            </div>
                        </div>
                        <div class="cart_item_price cart_info_col">
                            <div class="cart_item_title">Price</div>
                            <div class="cart_item_text" name="price">${item.price * item.inCart}$</div>
                        </div>
                        <div class="cart_item_price cart_info_col">
                            <div class="cart_item_title">Promotion</div>
                            <div class="cart_item_text" name="promotion">${item.promotion * item.inCart}$</div>
                        </div>
                        <div class="cart_item_total cart_info_col">
                            <div class="cart_item_title">Total</div>
                            <div class="cart_item_text" name="promotionPrice">${(item.inCart * item.price) - (item.inCart * item.promotion)}$</div>
                        </div>
                    </div>
                </li>
            </ul>`;
        });
        productTotal.innerHTML = `
                <div class="order_total_title">Order Total:</div>
                <div class="order_total_amount">${cart}$</div>`;


        deleteButtons();
        manageQuantity();
    }

}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.parentElement.previousElementSibling.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsIncart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log('This is cartItems', cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log('This is currentQuantity', currentQuantity);
            currentProduct = increaseButtons[i].parentElement.parentElement.previousElementSibling.previousElementSibling.parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log('This is currentProduct', currentProduct);
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsIncart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.delete_product i');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);
    let productName;
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.nextElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g, '').trim()
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart); // 4 - 
            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart - (cartItems[productName].inCart * cartItems[productName].promotion)));
            delete cartItems[productName];
            localStorage.setItem('productsIncart', JSON.stringify(cartItems));
            displayCart();
            onLoadCartNumbers();
        })
    }
}

function clearCart() {
    localStorage.clear();
    location.reload();

}
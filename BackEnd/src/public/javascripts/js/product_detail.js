let productDetail = document.querySelectorAll('.productDetail');
console.log(productDetail)

for (let i = 0; i < productDetail.length; i++) {
    productDetail[i].addEventListener('click', () => {
        localStorage.setItem('productDetailLocal', JSON.stringify(products[i]))
    })
}

displayProductDetail()
let addProduct = document.querySelector('.product_cart_button');
addProduct.addEventListener('click', () => {
    let getProduct = localStorage.getItem('productDetailLocal');
    getProduct = JSON.parse(getProduct);
    console.log(getProduct)
    cartNumbers(getProduct);
    totalCost(getProduct);
})

function displayProductDetail() {
    let getProduct = localStorage.getItem('productDetailLocal');
    getProduct = JSON.parse(getProduct);
    let productDetailContainer = document.querySelector('.single_product');
    productDetailContainer.innerHTML = `
    <div class="container">
                    <div class="row">
                        <!-- Images -->
                        <div class="col-lg-2 order-lg-1 order-2">
                            <ul class="image_list">
                                <li data-image=""><img src="${getProduct.image}" alt=""></li>
                                <li data-image=""><img src="${getProduct.image}" alt=""></li>
                                <li data-image=""><img src="${getProduct.image}" alt=""></li>
                            </ul>
                        </div>

                        <!-- Selected Image -->
                        <div class="col-lg-5 order-lg-2 order-1">
                            <div class="image_selected"><img src="${getProduct.image}" alt=""></div>
                        </div>

                        <!-- Description -->
                        <div class="col-lg-5 order-3">
                            <div class="product_description">
                                <div class="product_name">${getProduct.productName}</div>
                                <div class="rating_r rating_r_4 product_rating"></div>
                                <div class="product_text">
                                    <p>${getProduct.description}
                                    </p>
                                </div>
                                <div class="order_info d-flex flex-row">
                                    <form action="#">
                                        <div class="clearfix" style="z-index: 1000;">
                                        <div class="product_price" style="color: red">$${getProduct.price - getProduct.promotion}</div>
                                        <div class="button_container">
                                            <a href="/cart" class="productDetail" style="text-decoration: none; outline: none; color: black;">
                                              <button type="button" class="button cart_button product_cart_button" style="z-index:-1"> Buy now </button>
                                            </a>
                                            <div class="product_fav"><i class="fas fa-heart"></i></div>
                                        </div>
                                    </form>
                                    <hr>
                                    <div style="margin-top: 25px"><a href="tel:0379035252">Call to order  : 037 903 5252 (7:30 - 22:00)</a></div>
                                    <div style="border: 1px solid skyblue; padding: 5px">Choose more free services only available at <span style="color: red">OneTech</span>
                                    <div style="z-index:-1">
                                        <input type="checkbox" name="check1">
                                        <label for="check1">Delivery from the store closest to you</label><br>
                                        <input type="checkbox" name="check2">
                                        <label for="check2">Instructions for use, troubleshooting products</label><br>
                                        <input type="checkbox" name="check3">
                                        <label for="check3">Bring more products for you to see</label><br>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
    `
}
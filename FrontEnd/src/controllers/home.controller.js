import axios from 'axios'

module.exports.getHome = (req, res) => {
    axios.get('http://localhost:4500/')
        .then((response) => {
            let { products, categories, brands, errors, jsonData } = response.data
            res.render('index', {
                products,
                categories,
                brands,
                errors,
                jsonData
            })
        }).catch((error) => {
            res.render('index', {
                products: [],
                categories: [],
                brands: [],
                errors: '',
                jsonData: []
            })
        })
}
// cart
module.exports.getCart = (req, res) => {
    axios.get('http://localhost:4500/cart')
        .then((response) => {
            let { stripePublicKey, categories, brands } = response.data
            res.render('cart', {
                stripePublicKey,
                categories,
                brands
            })
        }).catch(() => {
            res.render('cart', {
                stripePublicKey: '',
                categories: [],
                brands: []
            })
        })
}

module.exports.getContact = (req, res) => {
    axios.get('http://localhost:4500/contact')
        .then((response) => {
            let { categories, brands } = response.data;
            res.render('contact', {
                categories,
                brands
            })
        }).catch(() => {
            res.render('contact', {
                categories: [],
                brands: []
            }
            )
        })
}

//  product detail
module.exports.productDetail = (req, res) => {
    axios.get('http://localhost:4500/product-details')
        .then((response) => {
            let { categories, brands } = response.data
            res.render('productDetail', {
                categories,
                brands
            })
        }).catch(() => {
            res.render('productDetail', {
                categories: [],
                brands: []
            })
        })

}
// filter category
module.exports.filterCategory = (req, res) => {
    let categoryId = req.params.id;
    axios.get('http://localhost:4500/filter-category/' + categoryId)
        .then((response) => {
            let { products, categories, brands, errors, jsonData } = response.data;
            res.render('main/filter/filter', {
                products,
                categories,
                brands,
                errors,
                jsonData
            })
        })
        .catch(() => {
            res.render('main/filter/filter', {
                products: [],
                categories: [],
                brands: [],
                errors: '',
                jsonData: []
            })
        })

}
// filter Brand
module.exports.filterBrand = (req, res) => {
    let brandId = req.params.id;
    axios.get('http://localhost:4500/filter-brand/' + brandId)
        .then((response) => {
            let { products, categories, brands, errors, jsonData } = response.data;
            res.render('main/filter/filter', {
                products,
                categories,
                brands,
                errors,
                jsonData
            })
        })
        .catch(() => {
            res.render('main/filter/filter', {
                products: [],
                categories: [],
                brands: [],
                errors: '',
                jsonData: []
            })
        })
}

// search
module.exports.search = (req, res) => {
    const search = req.query.key;
    axios.get('http://localhost:4500/search/?key=' + search)
        .then((response) => {
            let { products, categories, brands, errors, jsonData } = response.data
            res.render('main/filter/filter', {
                products,
                categories,
                brands,
                errors,
                jsonData
            })
        })
        .catch(() => {
            res.render('main/filter/filter', {
                products: [],
                categories: [],
                brands: [],
                errors: '',
                jsonData: []
            })
        })
};
// filter price
module.exports.filterPrice = (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    axios.get('http://localhost:4500/filter-price/?from=' + from + '&to=' + to)
        .then((response) => {
            let { products, categories, brands, errors, jsonData } = response.data;
            res.render('main/filter/filter', {
                products,
                categories,
                brands,
                errors,
                jsonData
            })
        })
        .catch(() => {
            res.render('main/filter/filter', {
                products: [],
                categories: [],
                brands: [],
                errors: '',
                jsonData: []
            })
        })
};
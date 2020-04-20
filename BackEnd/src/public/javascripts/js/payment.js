// function purchaseClicked() {
//     let totalCost = localStorage.getItem('totalCost');
//     totalCost = parseFloat(totalCost);
//     let stripeHandler = StripeCheckout.configure({
//         key: stripePublicKey,
//         locale: 'en',
//         token: function(token) {
//             let cartItems = localStorage.getItem('productsIncart');
//             fetch('/order/payment', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: {
//                     stripeTokenId: token.id,
//                     items: cartItems
//                 }
//             }).then(function(res) {
//                 console.log('Success')
//             })
//         }
//     })
//     stripeHandler.open({
//         amount: totalCost
//     })
// }
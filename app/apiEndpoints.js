/**
 * Author: Steven Dunn
 * Date Created: April 24, 2017
 * Dependencies: None
 */

(function () {
    'use strict';

    var productUrl = config.apiUrl + "products";
    var cartUrl = config.apiUrl + "cart";
    var accountUrl = config.apiUrl + "account";

    //apiUrlBase
    var products= {
        getAllProducts: productUrl,
        getProductById: "",
        getProductByName: config.apiUrl + "getproductbyname?name={productName}",
        addProduct: productUrl,
        removeProduct: productUrl + "/{productId}"
    };

    var cart = {
        addProductToCart: cartUrl+ "/{cartId}/addproduct/{productId}",
        removeProductFromCart: cartUrl+ "/{cartId}/removeproduct/{productId}",
        getCartProducts: cartUrl+ "/{cartId}/getproducts"
    };


    var account = {
        register: accountUrl+ "/register",
        login: accountUrl+ "/login?redirectUrl={url}",
        logout: accountUrl+ "/logout"
    };

    // Register end points
    config.apiEndPoints.products = products;
    config.apiEndPoints.cart = cart;
    config.apiEndPoints.account = account;
})();
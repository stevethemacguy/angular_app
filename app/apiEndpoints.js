/**
 * Author: Steven Dunn
 * Date Created: April 24, 2017
 * Dependencies: None
 */

(function () {
    'use strict';

    //apiUrlBase
    var products= {
        getAllProducts: config.apiUrl + "products",
        getProductById: "",
        getProductByName: config.apiUrl + "getproductbyname?name={productName}",
        addProduct: config.apiUrl + "products",
        removeProduct: config.apiUrl + "products/{productId}"
    };

    var cart = {
    };

    // Register end points
    config.apiEndPoints.products = products;
    config.apiEndPoints.cart = cart;
})();
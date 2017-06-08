//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller('ManageProductsController', ['$scope', '$rootScope','dataService', 'shoppingCartService', 'accountService', 'toastr', function($scope, $rootScope, dataService, shoppingCartService, accountService, toastr) {

    //Update the shopping cart
    if (typeof $rootScope.cartId !== 'undefined' && $rootScope.cartId !== null) {
        shoppingCartService.initializeCart();
    }
    else {
        //If the user navigates directly to the cart page (i.e. without clicking on the cart icon), then
        //$rootScope will not yet contain the logged in user. In this case, get the current user before loading the cart.
        accountService.getCurrentUser()
            .then(function fulfilled(response) {
                shoppingCartService.initializeCart();
            })
            .catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    }

    $scope.productList = [];

    //On Page load, get the list of products from the DB
    getUpdatedProductList();

    //On Page load, get the list of products from the DB
    function getUpdatedProductList() {
        dataService.getProductsFromApi()
            .then(function(data) {
                $scope.productList = data;
            });
    }

    $scope.productToAdd =
    {
        name: '',
        price: null,
        imageUrl: ''
    };

    //Add a product to the database and refresh the product list on screen
    $scope.addProduct = function() {
        $scope.productToAdd.price = parseInt($scope.productToAdd.price);
        dataService.addProduct($scope.productToAdd)
            .then(function(response) {
                getUpdatedProductList();
            });
    };

    $scope.removeProduct = function(productToRemove) {
        //Remove the product and refresh the product list on screen
        dataService.removeProduct(productToRemove)
            .then(function(response) {
                getUpdatedProductList();
                shoppingCartService.updateCartCount();
            }
        );
    };

    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. " + response.status + ": " + response.statusText);
    }

}]);
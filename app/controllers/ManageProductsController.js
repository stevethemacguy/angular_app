//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller('ManageProductsController', ['$scope', 'dataService', 'shoppingCartService','toastr', function($scope, dataService, shoppingCartService, toastr) {

    //Update the cart
    shoppingCartService.initializeCart();

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

}]);
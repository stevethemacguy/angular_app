//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller('ManageProductsController', ['$scope', 'dataService', 'toastr', function($scope, dataService, toastr) {

    $scope.productToAdd =
    {
        name: '',
        price: null,
        imageUrl: ''
    };

    //Add a product to the database
    $scope.addProduct = function() {
        $scope.productToAdd.price = parseInt($scope.productToAdd.price);
        dataService.addProduct($scope.productToAdd);
    };

    //Option 2: Instead of immediately initializing with all products. Add them one by one to the list
    //This allows the items to animate as they are added! (see weird for-loop below!)
    $scope.productList  = dataService.getTestProducts();

}]);
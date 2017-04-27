//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller('ManageProductController', ['$scope', 'dataService', 'toastr', function($scope, dataService, toastr) {

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
    }
}]);
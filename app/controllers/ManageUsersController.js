//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller('ManageUsersController', ['$scope', 'accountService', 'shoppingCartService','toastr', '$rootScope', function($scope, accountService, shoppingCartService, toastr, $rootScope) {

    //Update the cart
    shoppingCartService.initializeCart();

    $scope.isLoading = true;
    $scope.usersList = [];

    //On Page load, get the list of Users from the DB
    accountService.getAllUsers()
        .then(function(response) {
            $scope.usersList = response.data;
        })
        .catch(function(error) {
            responseError(error)
        })
        .finally(function() {
            $scope.isLoading = false;
        });

    $scope.productToAdd =
    {
        name: '',
        price: null,
        imageUrl: ''
    };

    //Used to hide the logged in user from the list of users.
    $scope.isCurrentUser = function(user) {
        return $rootScope.currentUser.email === user.email;
    };

    //Add a product to the database and refresh the product list on screen
    $scope.addUser = function() {
        $scope.productToAdd.price = parseInt($scope.productToAdd.price);
        dataService.addProduct($scope.productToAdd)
            .then(function(response) {
                getUpdatedProductList();
            });
    };

    $scope.removeUsers = function(productToRemove) {
        //Remove the product and refresh the product list on screen
        dataService.removeProduct(productToRemove)
            .then(function(response) {
                getUpdatedProductList();
                shoppingCartService.updateCartCount();
            }
        );
    };

    //Make user admin


    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. "+ response.status + ": "+ response.statusText);
    }
}]);
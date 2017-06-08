//Services are singletons. formService has a shippingData object that lives in the formService and
//can be shared across multiple controllers.
appModule.controller('ManageUsersController', ['$scope', 'accountService', 'shoppingCartService','toastr', '$rootScope', function($scope, accountService, shoppingCartService, toastr, $rootScope) {

    //Update the cart
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
    $scope.makeAdmin = function(user) {
        accountService.makeAdmin(user.email)
            .then(function(response) {
                toastr.success("The user was successfully promoted to an admin.");
                getUpdatedUsersList();
            })
            .catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    $scope.removeUser = function(user) {
        accountService.deleteUser(user.email)
            .then(function(response) {
                toastr.success("User successfully removed.");
                getUpdatedUsersList();
            })
            .catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    function getUpdatedUsersList() {
        $scope.isLoading = true;
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
    }

    //Make user admin


    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. "+ response.status + ": "+ response.statusText);
    }
}]);
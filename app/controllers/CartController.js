//Cart controller (now using correct Inline Bracket Syntax)
appModule.controller('CartController', ['$scope', '$rootScope', 'shoppingCartService', 'accountService', 'toastr', function($scope, $rootScope, shoppingCartService, accountService, toastr) {

    if (typeof $rootScope.cartId !== 'undefined' && $rootScope.cartId !== null) {
        initializeShoppingCart();
    }
    else {
        //If the user navigates directly to the cart page (i.e. without clicking on the cart icon), then
        //$rootScope will not yet contain the logged in user. In this case, get the current user before loading the cart.
        accountService.getCurrentUser()
            .then(function fulfilled(response) {
                initializeShoppingCart()
            })
            .catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    }

    function initializeShoppingCart() {
        shoppingCartService.initializeCart()
            .then(function() {
                //Price of all items in the cart. Starts with what's cart, but can change if things are added/removed
                $scope.totalPrice = shoppingCartService.getTotalCost();

                //The view needs to display all of the cart items, so add the cart to the scope
                $scope.cart = shoppingCartService.getCart();

                //Number of items in the cart. Warning: do not glue the getItemCount FUNCTION to the scope!
                //Just bind the return value by calling the function (like it is here)
                $scope.itemCount = shoppingCartService.getItemCount();

                //Whether the cart is empty or not
                $scope.empty = shoppingCartService.isCartEmpty();

                //Remove a product from the shopping cart
                $scope.removeFromCart = function(productId) {
                    //Remove the product from the DB
                    shoppingCartService.removeFromCart(productId).then(function(response) {
                        //At this point, the product has been removed from the cart via the API,
                        //but the change won't be seen until a page refresh. Since we still have the id of the product
                        //we just removed, remove it from the current $scope.cart so that the cart updates visually
                        for (var i = 0; i < $scope.cart.length; i++) {
                            var currentItem = $scope.cart[i];
                            //if there's an item with the same id as the one we just removed, then remove it
                            if (currentItem.id === productId) {
                                var index = $scope.cart.indexOf(currentItem);
                                //if it is, then remove it
                                if (index > -1) {
                                    $scope.cart.splice(index, 1);
                                    $scope.totalPrice -= currentItem.price;
                                    $scope.itemCount--;
                                }
                            }
                        }
                    })
                };

                //Old method
                /*$scope.removeFromCart = function(productToRemove, productName) {
                    //subtract the product's price from the total price
                    $scope.totalPrice -= dataService.getProductPrice(productToRemove);
                    shoppingCartService.removeFromCart(productToRemove);
                    toastr.success(productName + " was successfully removed from your cart");

                    //Update the number of items if it has changed.
                    $scope.itemCount = shoppingCartService.getItemCount();
                    $scope.empty = shoppingCartService.isCartEmpty();
                };*/
                /*});*/
            })
    }

    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. "+ response.status + ": "+ response.statusText);
    }

}]);
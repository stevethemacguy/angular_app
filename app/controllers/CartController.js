//Cart controller (now using correct Inline Bracket Syntax)
appModule.controller('CartController', ['$scope', 'shoppingCartService', 'dataService','toastr', function($scope, shoppingCartService, dataService,toastr)
{
    //Price of all items in the cart. Starts with what's cart, but can change if things are added/removed
    $scope.totalPrice = 0;

    //The view needs to display all of the cart items, so add the cart to the scope
    $scope.cart = shoppingCartService.getCart();

    //Update the total price
    for (var i = 0; i < shoppingCartService.getCart().length; i++)
    {
        $scope.totalPrice += shoppingCartService.getCart()[i].price;
    }

    //Number of items in the cart. Warning: do not glue the getItemCount FUNCTION to the scope!
    //Just bind the return value by calling the function (like it is here)
    $scope.itemCount = shoppingCartService.getItemCount();

    //Whether the cart is empty or not
    $scope.empty = shoppingCartService.isCartEmpty();

    $scope.removeFromCart = function(productToRemove, productName)
    {
        //subtract the product's price from the total price
        $scope.totalPrice -= dataService.getProductPrice(productToRemove);
        shoppingCartService.removeFromCart(productToRemove);
        toastr.success(productName + " was successfully removed from your cart");

        //Update the number of items if it has changed.
        $scope.itemCount = shoppingCartService.getItemCount();
        $scope.empty = shoppingCartService.isCartEmpty();
    };
}]);
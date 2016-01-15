//A service that saves the "state" of the shopping cart so that we can access it between views.
appModule.factory('shoppingCartService', function() {

    var shoppingCartService = {};

    //The customer's shopping cart, which is initially empty
    var theCart = [];

    //An array of objects
    shoppingCartService.getCart = function() {
        return theCart;
    };

    shoppingCartService.theCart = [];

    //Number of items in . Public constant that's exposed
    var itemCount = 0;

    //Adds a selected product to the customer's cart
    shoppingCartService.addToCart = function(product) {
        //See if the item is in the cart
        var index = (theCart.indexOf(product));

        //Don't add duplicates
        if (index == -1) {
            theCart.push(product);
            itemCount++;
        }
    };

    //Returns the total number of items in the cart
    shoppingCartService.getItemCount = function() {
        return itemCount;
    };

    //Returns true if the cart is empty
    shoppingCartService.isCartEmpty = function() {
        return itemCount <= 0;
    };

    //Adds a selected product to the customer's cart
    shoppingCartService.removeFromCart = function(productID) {
        //Go through every item in the cart
        for (var i = 0; i < theCart.length; i++) {
            var currentItem = theCart[i];
            //if there's an item with the same id as the one we want to remove
            if (currentItem.id === productID) {
                var index = theCart.indexOf(currentItem);

                //if it is, then remove it
                if (index > -1) {
                    theCart.splice(index, 1);
                    itemCount--;
                }
            }
        }
    };

    //Returns true if the item passed is currently in the shopping cart array
    shoppingCartService.isProductInCart = function(productObj) {
        //See if the item is in the cart
        var index = (theCart.indexOf(productObj));
        return index > -1;
    };

    //For debugging
    shoppingCartService.printCart = function() {
        for (var index = 0; index < theCart.length; index++) {
            var item = theCart[index];
            console.log("id: " + item.id + " name: " + item.name + " price: " + item.price);
        }
    };

    return shoppingCartService;
});
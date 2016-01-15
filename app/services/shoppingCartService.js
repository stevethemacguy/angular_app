//A service that saves the "state" of the shopping cart so that we can access it between views.
appModule.factory('shoppingCartService', function() {

    var theService = {};

    //The customer's shopping cart, which is initially empty
    var theCart = [];

    //Number of items in the cart
    var itemCount = 0;

    //An array of objects
    theService.getCart = function() {
        return theCart;
    };

    //Adds a selected product to the customer's cart
    theService.addToCart = function(product) {
        //See if the item is in the cart
        var index = (theCart.indexOf(product));

        //Don't add duplicates
        if (index == -1) {
            theCart.push(product);
            itemCount++;
        }
    };

    //Returns the total number of items in the cart
    theService.getItemCount = function() {
        return itemCount;
    };

    //Returns true if the cart is empty
    theService.isCartEmpty = function() {
        return itemCount <= 0;
    };

    //Adds a selected product to the customer's cart
    theService.removeFromCart = function(productID) {
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
    theService.isProductInCart = function(productObj) {
        //See if the item is in the cart
        var index = (theCart.indexOf(productObj));
        return index > -1;
    };

    //For debugging
    theService.printCart = function() {
        for (var index = 0; index < theCart.length; index++) {
            var item = theCart[index];
            console.log("id: " + item.id + " name: " + item.name + " price: " + item.price);
        }
    };

    return theService;
});
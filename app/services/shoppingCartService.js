//A service that saves the "state" of the shopping cart so that we can access it between views.
appModule.factory('shoppingCartService', function(dataService, toastr) {

    var theService = {};

    ///Old cart
    //var theCart = [];

    //The customer's shopping cart, which is initially empty
    var theCart =
        {
            totalPrice: 0,
            itemCount: 0,
            cartItems: []
        };

    function updateTotalCost() {
        //Update the total price
        for (var i = 0; i < theCart.cartItems.length; i++) {
            theCart.totalPrice += theCart.cartItems[i].price;
        }
    }

    //Comment out this line if you are using test Data
    theService.initializeCart = function() {
        theCart.itemCount = 0;
        theCart.totalPrice = 0;
        theCart.cartItems = [];

        return dataService.getProductsFromCart()
            .then(function(response) {
                theCart.cartItems = response.data;
                theCart.itemCount = response.data.length;
                updateTotalCost();
            });
    };

    //An array of products
    theService.getCart = function() {
        return theCart.cartItems;
    };

    theService.getTotalCost = function()
    {
        return theCart.totalPrice;
    };

    //Adds a selected product to the customer's cart
    /*theService.addToCart = function(product) {
        //See if the item is in the cart
        var index = (theCart.indexOf(product));


        //Don't add duplicates
        if (index === -1) {
            theCart.push(product);
            itemCount++;
        }
    };*/

    //Adds a selected product to the cart in the database using .NET Products API
    theService.addProductToCart = function(productId) {
        //make sure we have the most recent version of the cart before attempting to add
        return dataService.getProductsFromCart()
            .then(function(response) {
                theCart.cartItems = response.data;
                theCart.itemCount = response.data.length;
                updateTotalCost();

                var index = theCart.cartItems.map(function(el) {
                    return el.id;
                }).indexOf(productId);

                //Don't add duplicates
                if (index === -1) {
                    dataService.addProductToCart(productId);
                    theCart.itemCount++;
                    toastr.success('Successfully added 1 item to your cart');
                }
                else {
                    toastr.warning("The Product is already in the cart")
                }
            });
    };

    //Returns the total number of items in the cart
    theService.getItemCount = function() {
        return theCart.itemCount;
    };

    //Returns true if the cart is empty
    theService.isCartEmpty = function() {
        return theCart.itemCount <= 0;
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
        var index = (theCart.cartItems.indexOf(productObj));
        return index > -1;
    };

    //For debugging
    theService.printCart = function() {
        for (var index = 0; index < theCart.length; index++) {
            var item = theCart.cartItems[index];
            console.log("id: " + item.id + " name: " + item.name + " price: " + item.price);
        }
    };

    return theService;
});
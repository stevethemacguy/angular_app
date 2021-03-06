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
        theCart.totalPrice = 0;
        theCart.cartItems = [];
        return dataService.getProductsFromCart()
            .then(function(response) {
                theCart.cartItems = response.data;
                theCart.itemCount = response.data.length;
                updateTotalCost();
            });
    };

    //Ensure the cart count is up-to-date. We could update the entire cart, but it's not really needed
    theService.updateCartCount = function() {
        return dataService.getProductsFromCart()
            .then(function(response) {
                theCart.itemCount = response.data.length;
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

                //Don't add duplicates
                if (!theService.isProductInCart(productId)) {
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

    theService.removeFromCart = function(productId) {
        //make sure we have the most recent version of the cart before attempting to remove anything
        return dataService.removeProductFromCart(productId)
            .then(function(response) {
                toastr.success('Successfully removed 1 item from your cart');
                dataService.getProductsFromCart()
                    .then(function(response) {
                        theCart.cartItems = response.data;
                        theCart.itemCount = response.data.length;
                        theCart.totalPrice = 0;
                        updateTotalCost();
                        //console.log(theCart);
                    })
                    .catch(function(error) {
                        responseError(error)//Error handler if the $http request fails.
                    });
            });
    };

    //Returns true if the item passed is currently in the shopping cart array
    theService.isProductInCart = function(productId) {
        var index = -1;

        //If the cart has any items
        if (theCart.cartItems !== null && theCart.itemCount !== 0) {
            //Check to see if the new item being added already exists in the list
            //If the item already exists than the index will be something other than -1.
            index = theCart.cartItems.map(function(el) {
                return el.id;
            }).indexOf(productId);
        }

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

    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. "+ response.status + ": "+ response.statusText);
    }
});
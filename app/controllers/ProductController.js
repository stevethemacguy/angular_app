
//Note: This controller still uses the simple syntax because it's easier to read, but technically this would break if minifying. Here is the best practice syntax:
//appModule.controller("ProductController", ['$scope', '$timeout', 'dataService','shoppingCartService', function($scope,$timeout,dataService,shoppingCartService) { ... }]);
appModule.controller("ProductController", function($scope, $timeout, dataService, shoppingCartService, toastr) {

    //Option 1: Get all of the products. This is how you would do it 99.9% of the time, but I wanted animation.
    //$scope.productList = dataService.getProducts();

    //Option 2: Instead of immediately initializing with all products. Add them one by one to the list
    //This allows the items to animate as they are added! (see weird for-loop below!)
    $scope.productList  = [];

    //Temporary store the complete list of products
    var tempProductList = [];

    //Instead of immediately adding the products. Add each one by one. Allows the list to animate on load!
    //You can't do this in a normal for loop, but I found this solution online
    var generateProductList = function(data) {
        //This can be the data returned from the "real" http request version or the current products in "the DB"
        tempProductList = data;

        //Create a function that does the same thing as a for-loop and execute it immediately.
        //Uses Angular $timeout, which is the same as window.setTimeout. Basically pushes items every 30ms
        var index = 0;
        (function myLoop() {
            $timeout(function() {
                //normal check condition (if index < array length)
                if (index < tempProductList.length) {
                    //Push a product into the scope from the temporary list
                    $scope.productList.push(tempProductList[index]);
                    //console.log(tempProductList[index]); //Testing
                    index++; //Increment
                    myLoop(); //Keep looping
                }
            }, 30)
        })();
    };

    /////// Starting point fo the app \\\\\\\\\\

    //On Page load, get the list of products

    //Retrieve the products using the .Net Product API. Comment out these lines if you want to use the hardcoded data.
    /*dataService.getProductsFromApi()
        .then(function(data) {
            generateProductList(data);
        });*/

    //Retrieve the products using Heroku. Comment out these lines if you just want to use the hardcoded data.
    /*if (dataService.isDBInitialized() === false) {
        //Can NOT initialize more than once or else we'll lose information about which products are in the cart, etc.
        dataService.getProductsFromHeroku().then(function(data) {
            generateProductList(data);
        });
    }
    else {
        //Generate the "model" using the existing list of products
        generateProductList(dataService.getProducts());
    }*/

    //Retrieve the products using test data
    //Do NOT use this line and the Ajax generateProductList() lines above at the same time!
    generateProductList(dataService.getTestProducts());

    //Add the product to the the shopping cart. The product is passed in the function.
    //Since the cart is actually stored in the shoppingCartService, the data will persist across views
    $scope.addToCart = function(product) {
        shoppingCartService.addToCart(product);

        //Notification
        toastr.success('Successfully added 1 item to your cart');

        //Print out the contents of the cart
        /*shoppingCartService.printCart();*/
    };

    //item argument comes from the view
    $scope.alreadyInCart = function(item) {
        //Check to see if the item is already in the cart
        return shoppingCartService.isProductInCart(item);
    }

});
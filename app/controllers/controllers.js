//All of the services use the dataService. Services are singletons,
//so the dataService has data that is shared across all controllers.
appModule.controller("ShippingController", function($scope, formService) {

    //$scope.formData is the glue between the view and the controller (i.e. formData is the "model")
    //formData directly references (i.e. updates) the shippingData in the service so that
    //the state is preserved when switching views.
    $scope.formData = formService.shippingData;

    //Note: you can NOT do $scope.formData.name = "" here because you get a new instance
    //of a controller with each view. You could, however, do this in the service.

    //CAUTION: If the form inputs are invalid (according to angular) then the data
    //will NOT actually be stored in the service. This is good, just be aware of it
});

appModule.controller("PaymentController", function($scope, formService) {

    //Make the form data (i.e the "model") point to the service data so that the state is preserved when switching views
    $scope.formData = formService.paymentData;
});

appModule.controller("ProductController", function($scope, $timeout, dataService, shoppingCartService) {

    //Option 1: Get all of the products (they're displayed immediately)
    //$scope.productList = dataService.getProducts();

    //Option 2: Instead of immediately initializing with all products. Add them one by one to the list
    //This allows the items to animate as they are added! (see weird for-loop below!)
    $scope.productList  = [];

    //Instead of immediately adding the products. Add each one by one. Allows the list to animate on load!
    //You can't do this in a normal for loop, but I found this solution online

    //Temporary store the complete list of products
    var tempProductList = dataService.getProducts();

    //Create a function that does the same thing as a for-loop and execute it immediately.
    //Uses Angular $timeout, which is the same as window.setTimeout. Basically pushes items every 100ms
    var index = 0;
    (function myLoop () {
        $timeout(function () {
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

    //Add the product to the the shopping cart. The product is passed in the function
    //Since the cart is actually stored in the shoppingCartService, the data will persist across views
    $scope.addToCart = function(product)
    {
        shoppingCartService.addToCart(product);
        //Print out the contents of the cart
        /*shoppingCartService.printCart();*/
    };

    //item argument comes from the view
    $scope.alreadyInCart = function(item)
    {
        //Check to see if the item is already in the cart
        return shoppingCartService.isProductInCart(item);
    }

});

appModule.controller("ConfirmationController", function($scope, dataService) {
    //$scope.

});

appModule.controller("CartController", function($scope, shoppingCartService, dataService) {

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

    $scope.removeFromCart = function(productToRemove)
    {
        //subtract the product's price from the total price
        $scope.totalPrice -= dataService.getProductPrice(productToRemove);
        shoppingCartService.removeFromCart(productToRemove);

        //Update the number of items if it has changed.
        $scope.itemCount = shoppingCartService.getItemCount();
        $scope.empty = shoppingCartService.isCartEmpty();
    };

});

appModule.controller("ThankYouController", function($scope, dataService) {
    //$scope.

});

//Normally, you don't want any controllers in the index page, but I'm not sure how else to update the
//cart badge icon. The cart icon is outside of all other views, so needs a controller of it's own.
appModule.controller("IndexController", function($scope, shoppingCartService) {

    //Sort of hacky way to make angular watch for changes to the item count
    //The first function should return the value which is being watched.
    //AngularJS can then check the value returned against the value the watch function
    //returned the last time. if the value has changed, the second function is executed.
    //In this case, it updates itemCount in the view with the new value
    $scope.$watch(
        function() {
            return shoppingCartService.getItemCount()
        },

        function(newVal) {
            $scope.itemCount = newVal;
        }
    );
});


//In the demo, he created his controllers this way with an anonymous function.
//I prefer the other way (see my comments below), but I really don't know if the factory
//is working properly with my way (it works, but maybe just because it's in the same file),
//so you may want to use his way.

//Create a basic controller. Note: Angular will go look for simpleFactory and inject it here
//to be used by the controller

/* //Not used in this app, but kept the comments for reference
appModule.controller("SimpleController", function ($scope, simpleFactory)
{
    //Use the factory to generate/retrieve the customer data
    $scope.customers = simpleFactory.getCustomers();

    //You don't need to pass anything in. The name and city properties are actually defined/created
    //HERE in the controller. They're just bound to the input element in the view.
    //See my notes on scopes
    $scope.addCustomer = function() {
        $scope.customers.push(
            {
                name: $scope.newCustomer.name,
                city: $scope.newCustomer.city
            });
    };

});
*/

//NOTE: This is the other way to create controllers, but I'm not sure if the simplyFactory actually works properly this way?

//Store all controllers in one object and then pass the object to the module
/*
var controllers = {};

//Create the Controller dynamically (which adds it to the controllers object)
controllers.SimpleController = function($scope, simpleFactory) {

    //Works here but moved out into a factory
    /!*$scope.customers = [
        {name: 'John Smith', city: 'Phoenix'},
        {name: 'John Doe', city: 'Atlanta'},
        {name: 'Jane Doe', city: 'San Francisco'}
    ];*!/

    //Use the factory to generate/retrieve the customer data
    $scope.customers = simpleFactory.getCustomers();

    //You don't need to pass anything in. The name and city properties are actually defined/created
    //HERE in the controller. They're just bound to the input element in the view.
    //See my notes on scopes
    $scope.addCustomer = function() {
        $scope.customers.push(
            {
                name: $scope.newCustomer.name,
                city: $scope.newCustomer.city
            });
    }
};

//Pass in all of the controllers. In this case, just one
appModule.controller(controllers);
*/

//In the demo, he created his controllers this way with an anonymous function.
//I prefer the other way (see my comments below), but I really don't know if the factory
//is working properly with my way (it works, but maybe just because it's in the same file),
//so you may want to use his way.

//Create a basic controller. Note: Angular will go look for simpleFactory and inject it here
//to be used by the controller

//All of the services use the dataService. Services are singletons,
//so the dataService has data that is shared across all controllers.
appModule.controller("ShippingController", function($scope, formService) {
    //This is also the form controller...but I could make them separate controllers if I wanted

    //Bind the form data to our service data so that the state is preserved when switching views
    $scope.formData = formService.shippingData;

    //Initialize to empty values...these wil be set in the view (and then stored in the formSevice)
    //Technically formService.shippingData.name might not exist before now, in which case this just creates it
    //IF, however formService.shippingData.name DOES exist (e.g. after it is typed, for example),
    //then the view will use this data! In other words, the data persists AND is bound to the view

    //CAUTION: If the form inputs are invalid (according to angular) then the data
    //will NOT actually be stored in the service. This is good, just be aware of it
    $scope.formData.name = formService.shippingData.name;
    $scope.formData.email = formService.shippingData.email;
    $scope.formData.phone = formService.shippingData.phone;
    $scope.formData.billingPhone = formService.shippingData.billingPhone;


});

appModule.controller("PaymentController", function($scope, formService) {

    //Bind the form data to our service data so that the state is preserved when switching views
    $scope.formData = formService.shippingData;
});

appModule.controller("ProductController", function($scope, dataService, shoppingCartService) {
    $scope.productList = dataService.getProducts();

    //Add the product to the locally stored shopping cart. This is passed in the function
    $scope.shoppingCartService = function(product)
    {
        shoppingCartService.addToCart(product);
    };

    //item argument comes from the view
    $scope.alreadyInCart = function(item)
    {
        //Check to see if the item is already in the cart
        return dataService.isProductInCart(item);
    }

});

appModule.controller("ConfirmationController", function($scope, dataService) {
    //$scope.

});

appModule.controller("CartController", function($scope, shoppingCartService) {

    //Initialize the empty shopping cart
    $scope.shoppingCart = [];

    //Get the current cart from the dataService
    $scope.shoppingCart = shoppingCartService.getCart();

    //Price of all items in the cart. Starts with what's cart, but can change if things are added/removed
    $scope.totalPrice = 0;

    for (var i = 0; i < $scope.shoppingCart.length; i++)
    {
        $scope.totalPrice += $scope.shoppingCart[i].price;
    }

    //Number of items in the cart
    $scope.itemCount = shoppingCartService.getItemCount();

    //Whether the cart is empty or not
    $scope.empty = shoppingCartService.isCartEmpty();

    $scope.removeFromCart = function(productToRemove)
    {
        //subtract the product's price from the total price
        $scope.totalPrice -= dataService.getProductPrice(productToRemove);
        shoppingCartService.removeFromCart(productToRemove);

        //Update the number of items if it changed.
        //CAUTION: There's probably a better way to do this in angular. I'm hacking this for now
        $scope.itemCount--;
        $scope.empty = shoppingCartService.isCartEmpty();
    };

});

appModule.controller("ThankYouController", function($scope, dataService) {
    //$scope.

});

//Normally, you don't want any controllers in the index page, but I'm not sure how else to update the
//cart badge icon. In this case, I'm passing the entire dataService into the scope, which seems weird.
appModule.controller("IndexController", function($scope, dataService) {
    //Sort of hacky?
    $scope.dataService = dataService;

    //Dirty hacky way to make angular watch for changes to the item count
    //I'm doing this because trying to do $scope.itemCount = dataService.getItemCount() doesn't work, because it's only called once
    $scope.itemCount= dataService.getItemCount();

    $scope.$watch(
        function(){ return dataService.getItemCount() },

        function(newVal) {
            $scope.itemCount = (newVal > 0);
        }
    );
    ///END DIRTY HACK
});


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

//In the demo, he created his controllers this way with an anonymous function.
//I prefer the other way (see my comments below), but I really don't know if the factory
//is working properly with my way (it works, but maybe just because it's in the same file),
//so you may want to use his way.

//Create a basic controller. Note: Angular will go look for simpleFactory and inject it here
//to be used by the controller

//All of the services use the dataService. Services are singletons,
//so the dataService has data that is shared across all controllers.
appModule.controller("ShippingController", function($scope, dataService) {
});

appModule.controller("BillingController", function($scope, dataService) {
    //$scope.

});

appModule.controller("PaymentController", function($scope, dataService) {
    $scope.test = dataService.getCustomers();
    $scope.numbers = dataService.getNumbers();

});

appModule.controller("ProductController", function($scope, dataService) {
    $scope.productList = dataService.getProducts();

});

appModule.controller("ConfirmationController", function($scope, dataService) {
    //$scope.

});

appModule.controller("CartController", function($scope, dataService) {
    //Access the service Singleton through the factory
    $scope.test = dataService.getCustomers();
    $scope.numbers = dataService.getNumbers();
});

appModule.controller("ThankYouController", function($scope, dataService) {
    //$scope.

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

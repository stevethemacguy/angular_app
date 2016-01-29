
//Normally, you don't want any controllers in the index page, but I'm not sure how else to update the
//cart badge icon. The cart icon is outside of all other views, so needs a controller of it's own.
appModule.controller("IndexController", function($scope, $timeout, shoppingCartService) {

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
            //A little true/false flag so we can remove the bouncein class (and quickly re-add it)
            //The itemCount animates with each change. If we didn't use the flag, then the class would be added once
            //but never removed (i.e. the first item would animate, but adding/removing others would have no effect
            $scope.notZero = false;

            //Change the item count after a tiny delay to ensure we remove the animation class first.
            $timeout(function () {
                //Set the actual count
                $scope.itemCount = newVal;
                $scope.notZero = true;
            }, 50);
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
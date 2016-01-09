//Create a Module to be used with this app and call the module "appModule".
//You don't have to use the same name as the variable, but it's a good idea.
//NOTE: Some versions of phpStorm won't recognize .module or .controller...It is a bug!
var appModule = angular.module("appModule", ['ngRoute']);

//In the demo, he created his controllers this way with an anonymous function.
//I prefer the other way (see my comments below), but I really don't know if the factory
//is working properly with my way (it works, but maybe just because it's in the same file),
//so you may want to use his way.

//Create a basic controller. Note: Angular will go look for simpleFactory and inject it here
//to be used by the controller
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
    }
});

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

//Configure routes for the app (i.e. "glue" the views to their respective controllers.
appModule.config(['$routeProvider', function($routeProvider)
{
    var viewBase = 'partials/';
    $routeProvider
        .when('/view1',          //This could also be '/' to default to view1
            {
                controller: 'SimpleController',
                templateUrl: viewBase + 'view1.html',
                controllerAs: 'vm'
            })
        .when('/view2', {
            controller: 'SimpleController',
            templateUrl: viewBase + 'view2.html',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/view1' });  //This could also be '/' instead
}]);

//Creates an object and returns it (I'm using hard coded data here, but the factory could connect to a DB, etc.
appModule.factory('simpleFactory', function()
{
    var customers = [
        {name: 'John Smith', city: 'Phoenix'},
        {name: 'John Doe', city: 'Atlanta'},
        {name: 'Jane Doe', city: 'San Francisco'}
    ];

    var factory = {};

    //Add stuff to the factory object
    factory.getCustomers = function() {
        return customers;
    };

    //return it
    return factory;
});
//Create a Module to be used with this app and call the module "appModule".
//You don't have to use the same name as the variable, but it's a good idea.
//NOTE: Some versions of phpStorm won't recognize .module or .controller...It is a bug!
var appModule = angular.module("appModule", ['ngRoute','ngAnimate','ui.bootstrap']);

//Configure routes for the app (i.e. "glue" the views to their respective controllers.
appModule.config(['$routeProvider', function($routeProvider)
{
    var viewBase = 'app/views/';
    $routeProvider
        .when('/view1',          //This could also be '/' to default to view1
            {
                controller: 'SimpleController',
                templateUrl: viewBase + 'view1.html'
                /*controllerAs: 'vm'*/
            })
        .when('/view2', {
            controller: 'SimpleController',
            templateUrl: viewBase + 'view2.html'
            /*controllerAs: 'vm'*/
        })
        .when('/shipping', {
            controller: 'ShippingController',
            templateUrl: viewBase + 'shipping.html'
            /*controllerAs: 'vm'*/
        })
        .when('/billing', {
            controller: 'BillingController',
            templateUrl: viewBase + 'billing.html'
            /*controllerAs: 'vm'*/
        })
        .when('/payment', {
            controller: 'PaymentController',
            templateUrl: viewBase + 'payment.html'
            /*controllerAs: 'vm'*/
        })
        .when('/products', {
            controller: 'ProductController',
            templateUrl: viewBase + 'products.html'
            /*controllerAs: 'vm'*/
        })
        .when('/confirmation', {
            controller: 'ConfirmationController',
            templateUrl: viewBase + 'confirmation.html'
            /*controllerAs: 'vm'*/
        })
        .when('/cart', {
            controller: 'CartController',
            templateUrl: viewBase + 'cart.html'
            /*controllerAs: 'vm'*/
        })
        .when('/thankyou', {
            controller: 'ThankYouController',
            templateUrl: viewBase + 'thankyou.html'
            /*controllerAs: 'vm'*/
        })
        .otherwise({ redirectTo: '/view1' });  //This could also be '/' instead
}]);

//Note that controllers and factories, etc are in separate folders.
//This file is just used for configuration and routing.
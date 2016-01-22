//Create a Module to be used with this app and call the module "appModule".
//You don't have to use the same name as the variable, but it's a good idea.
//NOTE: Some versions of phpStorm won't recognize .module or .controller...It is a bug!
var appModule = angular.module("appModule", ['ngRoute','door3.css','ngAnimate','ui.bootstrap']);

//Configure routes for the app (i.e. "glue" the views to their respective controllers.
appModule.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider)
{
    //Turn on HTML5 mode for routing
    $locationProvider.html5Mode(true).hashPrefix('#'); //The hashprefix is the backup for non-html5 browsers

    var viewBase = 'app/views/';
    var cssPath = 'content/css/'; //Used by routeStyles

    $routeProvider
        .when('/',{ redirectTo: '/home' })//just redirect to home if they come in from localhost:3000
        .when('/shipping', {
            title: 'Shipping',
            controller: 'ShippingController',
            templateUrl: viewBase + 'shipping.html',
            css: cssPath + 'shipping.css'
            /*controllerAs: 'vm'*/
        })
        .when('/payment', {
            title: 'Payment',
            controller: 'PaymentController',
            templateUrl: viewBase + 'payment.html',
            css: cssPath + 'payment.css'
            /*controllerAs: 'vm'*/
        })
        .when('/home', {
            title: 'Home',
            controller: 'ProductController',
            templateUrl: viewBase + 'products.html',
            css: cssPath + 'products.css'
            /*controllerAs: 'vm'*/
        })
        .when('/confirmation', {
            title: 'Checkout Confirmation',
            controller: 'ConfirmationController',
            templateUrl: viewBase + 'confirmation.html',
            css: cssPath + 'confirmation.css'
            /*controllerAs: 'vm'*/
        })
        .when('/cart', {
            title: 'Shopping Cart',
            controller: 'CartController',
            templateUrl: viewBase + 'cart.html',
            css: [cssPath + 'products.css', cssPath + 'cart.css']
            /*controllerAs: 'vm'*/
        })
        .when('/thankyou', {
            title: 'Thank you!',
            controller: 'ThankYouController',
            templateUrl: viewBase + 'thankyou.html',
            css: cssPath + 'thankyou.css'
            /*controllerAs: 'vm'*/
        })
        //If you want an error message when people enter a bad url, then you could create it here instead of sending
        //users back home. Note: A 404 error, however, is not possible in angular becuase it doesn't make server requests.
        //If you want a true 404, then you have to do it on the server.
        .otherwise({ redirectTo: '/home' });  //This could also be '/' instead
}]);

//Special case to change page title on each view
appModule.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title; //or current.$$route.title;
    });
}]);

//Note that controllers and factories, etc are in separate folders.
//This file is just used for configuration and routing.
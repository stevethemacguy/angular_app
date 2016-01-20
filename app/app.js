//Create a Module to be used with this app and call the module "appModule".
//You don't have to use the same name as the variable, but it's a good idea.
//NOTE: Some versions of phpStorm won't recognize .module or .controller...It is a bug!
var appModule = angular.module("appModule", ['ngRoute','door3.css','ngAnimate','ui.bootstrap']);

//Configure routes for the app (i.e. "glue" the views to their respective controllers.
appModule.config(['$routeProvider', function($routeProvider)
{
    var viewBase = 'app/views/';
    var cssPath = 'content/css/'; //Used by routeStyles

    $routeProvider
        .when('/',{ redirectTo: '/home' })//just redirect to home if they come in from localhost:3000
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
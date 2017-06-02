//Configure routes for the app (i.e. "glue" the views to their respective controllers.
appModule.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
    //Turn on HTML5 mode for routing
    $locationProvider.html5Mode(true).hashPrefix('#'); //The hashprefix is the backup for non-html5 browsers

    var viewBase = 'app/views/';
    var cssPath = 'content/sass/css/'; //Used by routeStyles

    $routeProvider
        .when('/',{ redirectTo: '/home' })//just redirect to home if they come in from localhost:3000
        .when('/shipping', {
            title: 'Shipping',
            controller: 'ShippingController',
            templateUrl: viewBase + 'shipping.html',
            css: cssPath + 'shipping.css'
            /*controllerAs: 'vm'*/
        })
        .when('/login', {
            title: 'Login',
            controller: 'AccountController',
            templateUrl: viewBase + 'login.html',
            css: cssPath + 'login.css'
            /*controllerAs: 'vm'*/
        })
        .when('/logout', {
            title: 'Logout',
            //controller: 'AccountController',
            templateUrl: viewBase + 'logout.html',
            css: cssPath + 'logout.css'
            /*controllerAs: 'vm'*/
        })
        .when('/register', {
            title: 'Register User',
            controller: 'AccountController',
            templateUrl: viewBase + 'register.html',
            css: cssPath + 'register.css'
            /*controllerAs: 'vm'*/
        })
        .when('/payment', {
            title: 'Payment',
            controller: 'PaymentController',
            templateUrl: viewBase + 'payment.html',
            css: cssPath + 'payment.css'
            /*controllerAs: 'vm'*/
        })
        .when('/manage-products', {
            title: 'Product Management',
            controller: 'ManageProductsController',
            templateUrl: viewBase + 'manage-products.html',
            css: cssPath + 'manage-products.css'
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
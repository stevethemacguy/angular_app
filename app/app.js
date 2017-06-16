//Create a Module to be used with this app and call the module "appModule".
//You don't have to use the same name as the variable, but it's a good idea.
//NOTE: Some versions of phpStorm won't recognize .module or .controller...It is a bug!
var appModule = angular.module("appModule", [
    'ngRoute',
    'door3.css',
    'ngAnimate',
    'ui.bootstrap',
    'ngStorage',
    'toastr']
    )
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);

appModule.config(function(toastrConfig)
{
    //Configure the toastr notifications
    angular.extend(toastrConfig, {
        //Configure the toastr container
        containerId: 'toast-container', //ID of the hidden html container that holds the toasts
        maxOpened: 0,   //Maximum number of toasts that can be opened. 0 meansno limit
        newestOnTop: false, //put new toasts at the bottom
        positionClass: 'toast-top-center',
        preventOpenDuplicates: false, //Prevent duplicates of open toasts.
        /*preventDuplicates: false,
        preventOpenDuplicates: false,*/
        target: 'body',

        //Configure the toastr message itself (what's inside the toast-container)
        closeButton: true,
        //iconClass: 'notification',   //The default type classes for the different toasts.
        timeOut: 1850, //How long before hiding the notification, If zero, they won't hide
        messageClass: 'notification-message', //The class for the toast's message.
        //toastClass: 'notification'//The main class for toasts (i.e the visible container)
        //WARNING: toastClass currently breaks animation for some reason. Target the .toastr class directly! instead
        titleClass: 'notification-title' //The class for the toast's title, if it has one.
    });

});

//Special case to change page title on each view
appModule.run(['$rootScope', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title; //or current.$$route.title;
    });
    $rootScope.currentUser = null;
}]);

//Note that controllers and factories, etc are in separate folders.
//This file is just used for configuration and routing.
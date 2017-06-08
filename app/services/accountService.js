//Factory is used here to creates a service. ALl services return a singleton object.
appModule.factory('accountService', function($rootScope, $http, toastr, $location) {
    //Create the empty service object
    var theService = {};

    theService.login = function(user, redirectUrl) {
        var apiUrl = config.apiEndPoints.account.login.replace('{url}', redirectUrl);
        return $http.post(apiUrl, user, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                toastr.success("Login was successful");
                $rootScope.currentUser = user;
                //Associate the current user with his/her shopping cart by using the user's ID as the cart ID
                $rootScope.cartId = user.id;
                $location.path("/home");
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    theService.register = function(user) {

        var apiUrl = config.apiEndPoints.account.register;

        return $http.post(apiUrl, user, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
            })
            .then(function(response) {
                $rootScope.currentUser = user;
                //Associate the current user with his/her shopping cart by using the user's ID as the cart ID
                $rootScope.cartId = user.id;
                toastr.success("Registration was successful. You are now logged in");
                $location.path("/home");

            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    theService.logout = function(user, redirectUrl) {
        var apiUrl = config.apiEndPoints.account.logout;
        return $http.post(apiUrl, user, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            })
            .then(function(response) {
                $rootScope.currentUser = null;
                $rootScope.cartId = null;
                toastr.success("Logout was successful");
                $location.path("/logout");
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    theService.getCurrentUser = function() {
        var apiUrl = config.apiEndPoints.account.getCurrentUser;
        return $http.get(apiUrl)
            .then(function fulfilled(response) {
                if (typeof response === 'undefined') {
                    $rootScope.currentUser = null;
                    $rootScope.cartId = null;
                }
                else {
                    $rootScope.currentUser = response.data;
                    //Associate the current user with his/her shopping cart by using the user's ID as the cart ID
                    $rootScope.cartId = $rootScope.currentUser.id;
                }
            })
            .catch(function(error) {
                if (error.status === 404) {
                    toastr.error("There was an error singing you in. Please register to continue");
                    $location.path("/register");
                }
                if (error.status === 401) {
                    toastr.error("You must be logged in to view this page. Please login to continue");
                    $location.path("/login");
                }
                else {
                    responseError(error)
                }
            });
    };

    theService.getAllUsers = function() {
        var apiUrl = config.apiEndPoints.account.getAllUsers;
        return $http.get(apiUrl)
            .then(function(response) {
                return response;
            });
    };

    theService.getUserRoles = function() {
        var apiUrl = config.apiEndPoints.account.getUserRoles;
        return $http.get(apiUrl)
            .then(function(response) {
                return response;
            }).catch(function(error) {
                responseError(error)
            });
    };

    //Error handler for the ajax request
    function responseError(response) {
        if (typeof response !== "undefined" && typeof response.data !== "undefined") {
            var errors = response.data.errorMessages;
            var formattedMessage = "";
            //build the error message to return in the toaster response
            if (typeof errors !== 'undefined' && errors !== null) {
                for (var i = 0; i < errors.length; i++) {
                    formattedMessage += errors[i] + "<br/>";
                }
            }

            toastr.error("<br/>" + formattedMessage, "Ajax Request failed with status code: " + response.status, {
                allowHtml: true
            });
        }
    }

    //return it
    return theService;
});
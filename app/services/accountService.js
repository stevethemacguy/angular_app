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
            }
        )
            .then(function(response) {
                $rootScope.currentUser = user;
                toastr.success("Login was successful");
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
                toastr.success("Logout was successful");
                $location.path("/logout");
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    theService.getUserRoles = function() {
        var apiUrl = config.apiEndPoints.account.getUserRoles;
        return $http.get(apiUrl)
            .then(function(response) {
                return response;
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
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
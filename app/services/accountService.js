
//Factory is used here to creates a service. ALl services return a singleton object.
appModule.factory('accountService', function($http, toastr) {

    //Create the empty service object
    var theService = {};

    //Get products using the .Net Core Product API.
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
            toastr.success("Login was successful");
        }).catch(function(error) {
            responseError(error)//Error handler if the $http request fails.
        });
    };

    //Get products using the .Net Core Product API.
    theService.register = function(user) {
        var apiUrl = config.apiEndPoints.account.register;

        return $http.post(apiUrl, user,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
            })
            .then(function(response) {
                toastr.success("The user was successfully registered");
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    //Get products using the .Net Core Product API.
    theService.logout = function(user, redirectUrl) {
        var apiUrl = config.apiEndPoints.account.logout;
        return $http.post(apiUrl, user, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }
        )
            .then(function(response) {
                toastr.success("Logout was successful");
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    //Error handler for the ajax request
    function responseError(response) {
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

    //return it
    return theService;
});
//Account controller (now using correct Inline Bracket Syntax)
appModule.controller('AccountController', ['$rootScope', '$scope', 'accountService', 'toastr', '$location', function($rootScope, $scope, accountService, toastr, $location) {

    $scope.user = {
        email: "",
        password: "",
        confirmPassword: "",
        role: "basic", //Used by the identity framework
        roleType: "basic" //A string description to make a .Net Claim (i.e. a key/value pair to make it easier to read the roleType)
    };

    //Check to see if a user is logged in
    accountService.getCurrentUser()
        .then(function fulfilled(response) {
            if (typeof response === 'undefined') {
                $rootScope.currentUser = null;
                $rootScope.cartId = null;
            }
            else {
                $rootScope.currentUser = response.data;
                //Associate the current user with his/her shopping cart by using the user's ID as the cart ID
                $rootScope.cartId = $rootScope.currentUser;
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

    //$scope doesn't work well without an object, so create a checkboxes object and put the roleCheckbox property on it
    $scope.checkboxes = {
        roleCheckbox: false
    };

    $scope.showError = false;

    //Check that both passwords match
    $scope.noMatch = function() {
        return !($scope.user.password === $scope.user.confirmPassword);
    };

    $scope.login = function() {
        if ($scope.user.email === "") {
            return;
        }
        if ($scope.noMatch()) {
            $scope.showError = true;
            return;
        }
        $scope.showError = false;

        var redirectUrl = "home";

        return accountService.login($scope.user, redirectUrl)
            .then(function(response) {
                if (typeof response !== "undefined") {
                    //redirect to the homepage
                    $location.path(redirectUrl);
                }
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    $scope.logout = function() {
        return accountService.logout()
            .then(function(response) {
                //redirect to the homepage
                //$location.path(redirectUrl);
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    $scope.register = function() {
        if ($scope.user.email === "") {
            return;
        }
        if ($scope.noMatch()) {
            $scope.showError = true;
            return;
        }

        $scope.showError = false;

        //If checked, then the user is an admin. Otherwise, the default is "basic"
        if ($scope.checkboxes.roleCheckbox) {
            $scope.user.role = "admin";
            $scope.user.roleType = "admin";
        }
        return accountService.register($scope.user)
            .then(function(response) {
                //do nothing
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    $scope.getUserRoles = function() {
        return accountService.getUserRoles()
            .then(function(response) {
                return response;
            }).catch(function(error) {
                responseError(error)//Error handler if the $http request fails.
            });
    };

    //Error handler for the ajax request
    function responseError(response) {
        toastr.error("Ajax Request failed. " + response.status + ": " + response.statusText);
    }

}]);
appModule.controller('LoginController', ['$rootScope', '$scope', 'accountService', 'toastr', '$location', function($rootScope, $scope, accountService, toastr, $location) {

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